import React from 'react';
import { Button } from 'react-bootstrap';
import { FormattedMessage, useIntl } from 'react-intl';
import {useDispatch, useSelector } from 'react-redux';
import { HugeCloseIcon } from 'src/assets/images/CloseIcon';
import { LogoIcon } from 'src/assets/images/LogoIcon';
import {
    beneficiariesCreate,
    BeneficiaryBank,
    lookupFetch,
    selectLookupData,
    selectUserInfo,
    UserProfile,
} from 'src/modules';
import { BeneficiariesWarningModal } from 'src/custom/components/Beneficiaries/BeneficiariesWarningModal';
import { CodeVerification, CustomInput } from 'src/components';
import { WarningMessage } from 'src/custom/components/WarningMessage';
import classnames from 'classnames';

interface Props {
    beneficiary: {
        currency: string;
        name: string;
        data: BeneficiaryBank;
    };
    description?: string;
    handleToggleConfirmationModal: () => void;
    clearInputs: () => void;
}

const BeneficiariesConfirmModalContentComponent: React.FC<Props> = ({ description, beneficiary, handleToggleConfirmationModal, clearInputs }: Props) => {
    const [fullName, setFullName] = React.useState<string>('');
    const [fullNameFocused, setFullNameFocused] = React.useState<boolean>(false);
    const [isOpenWarningModal, setWarningModal] = React.useState<boolean>(false);
    const [otpCode, setOtpCode] = React.useState<string>('');

    const { formatMessage } = useIntl();
    const user = useSelector(selectUserInfo);
    const lookup = useSelector(selectLookupData);
    const dispatch = useDispatch();

    const translate = React.useCallback((id: string) => formatMessage({ id }), []);

    React.useEffect(() => {
        setFullName(verifiedProfile?.first_name ? `${verifiedProfile?.first_name} ${verifiedProfile?.last_name}` : '');
        setFullNameFocused(false);
    }, [user]);

    React.useEffect(() => {
        const payload = {
            bank_code: beneficiary.data.bank_code,
            account_no: beneficiary.data.account_no,
        };

        dispatch(lookupFetch(payload));
    }, []);

    const handleSubmitConfirmModal = React.useCallback(() => {
        const newData = {
            ...beneficiary.data,
            full_name: fullName,
        };
        const payload = {
            ...beneficiary,
            otp: otpCode,
            data: JSON.stringify(newData),
        };

        dispatch(beneficiariesCreate(payload));
    }, [fullName, otpCode]);

    const renderWarningNames = React.useMemo( () => {
        return (
            <span>
                <span>
                    <FormattedMessage id="page.body.wallets.warning.withdraw.bank.name.hint" />
                </span>
            </span>
        );
    }, []);

    const handleFilterByState = React.useCallback((elements: UserProfile[], filter: string[]): UserProfile | null => {
        if (elements.length) {
            return elements.filter(item => filter.includes(item.state.toLowerCase())).pop();
        }

        return null;
    }, [user]);

    const verifiedProfile = React.useMemo(() => handleFilterByState(user.profiles, ['verified']), [user]);

    const isWarningName = React.useMemo(() => (fullName.toLowerCase() !== `${lookup?.first_name} ${lookup?.surname}`.toLowerCase()), [lookup, fullName]);

    const isCorrectName = React.useMemo(() => (`${verifiedProfile?.first_name}${verifiedProfile?.last_name}`.toLowerCase() !== `${lookup?.first_name}${lookup?.surname}`.toLowerCase()), [lookup, verifiedProfile]);

    const renderWarnings = React.useMemo(() => {
        return (
            <div>
                <WarningMessage children={renderWarningNames} hint={'page.body.wallets.warning.bank.name.hint'}/>
            </div>
        );
    }, []);

    const focusedClass = React.useMemo(() => (
        classnames('cr-email-form__group', {
            'cr-email-form__group--focused': fullNameFocused,
        })
    ), [fullNameFocused]);

    const renderFullNameInput = React.useMemo(() => {
        return (
            <div key={fullName} className={focusedClass}>
                <CustomInput
                    type="text"
                    label={''}
                    placeholder={fullNameFocused ? '' : translate(`page.body.wallets.beneficiaries.confirmationModal.body.fullName`)}
                    defaultLabel={''}
                    handleChangeInput={value => setFullName(value)}
                    // @ts-ignore
                    inputValue={fullName}
                    handleFocusInput={() => setFullNameFocused(true)}
                    classNameLabel="cr-email-form__label"
                    classNameInput="cr-email-form__input"
                    autoFocus={true}
                    labelVisible={fullNameFocused}
                />
            </div>
        );
    }, [fullName, fullNameFocused]);

    const handleChangeCodeValue = React.useCallback((value: string) => {
        setOtpCode(value);
    }, [otpCode]);

    const renderOtpCode = React.useMemo(() => {
        return (
            <div className="pg-exchange-modal-submit-footer modal-footer__withdraw-confirm">
                <div className="tip__content__block text-left">
                    <span className="tip__content__block__label">
                        <FormattedMessage id="page.body.wallets.tabs.withdraw.modal.verification" />
                    </span>
                    <span className="tip__content__block__value">
                        <FormattedMessage id="page.body.wallets.tabs.withdraw.modal.message" />
                    </span>
                </div>
                <div className="modal-footer__withdraw-confirm-form">
                    <div className="modal-footer__withdraw-confirm-form-row">
                        <fieldset className="modal-footer__withdraw-confirm-form-input">
                            <CodeVerification
                                code={otpCode}
                                onChange={handleChangeCodeValue}
                                codeLength={6}
                                type="text"
                                placeholder="X"
                                inputMode="decimal"
                                showPaste2FA={true}
                            />
                        </fieldset>
                    </div>
                </div>
            </div>
        );
    }, [otpCode]);

    const validateFullName = React.useMemo(() =>  fullName.length > 40 || fullName.match(/^(?:[\u00c0-\u01ffa-zA-Z'-]){2,}(?:\s[\u00c0-\u01ffa-zA-Z'-]{2,})+$/i) === null, [fullName]);

    const fullNameClasses = React.useMemo(() => classnames('tip__content__block', {
        'tip__content__block--warning': validateFullName,
    }), [validateFullName]);

    const renderConfirmAddressModalBody = React.useMemo(() => {
        const isDisabled = otpCode.length < 6 || !fullName || validateFullName || isWarningName; 

        return (
            <div className="pg-beneficiaries__dropdown__tip confirm">
                <div className="tip__content">
                    <div className={fullNameClasses}>
                        <span className="tip__content__block__label">
                            {validateFullName ? 
                                <FormattedMessage id="page.body.wallets.beneficiaries.confirmationModal.body.warning.fiat.fullName" /> : 
                                <FormattedMessage id="page.body.wallets.beneficiaries.dropdown.fiat.fullName" />
                            }
                        </span>
                        <span className="tip__content__block__value with-input">
                            {renderFullNameInput}
                        </span>
                    </div>
                    <div className="tip__content__block">
                        <span className="tip__content__block__label">
                            <FormattedMessage id="page.body.wallets.beneficiaries.dropdown.fiat.name" />
                        </span>
                        <span className="tip__content__block__value">
                            {beneficiary.name}
                        </span>
                    </div>
                    <div className="tip__content__block">
                        <span className="tip__content__block__label">
                            <FormattedMessage id="page.body.wallets.beneficiaries.dropdown.fiat.accountNumber" />
                        </span>
                        <span className="tip__content__block__value">
                            {beneficiary.data.account_no}
                        </span>
                    </div>
                    <div className="tip__content__block">
                        <span className="tip__content__block__label">
                            <FormattedMessage id="page.body.wallets.beneficiaries.dropdown.fiat.bankCode" />
                        </span>
                        <span className="tip__content__block__value">
                            {beneficiary.data.bank_code}
                        </span>
                    </div>
                    {description && (
                        <div className="tip__content__block">
                            <span className="tip__content__block__label">
                                <FormattedMessage id="page.body.wallets.beneficiaries.dropdown.fiat.description" />
                            </span>
                            <span className="tip__content__block__value">{description}</span>
                        </div>)
                    }
                    {renderOtpCode}
                </div>
                <div className="cr-email-form__button-wrapper confirm">
                    {isWarningName && renderWarnings}
                    <div className="cr-confirmation-modal__button-wrapper">
                        <Button
                            className="text-uppercase"
                            onClick={handleToggleConfirmationModal}
                            size="lg"
                            variant="secondary"
                        >
                            <FormattedMessage id="page.body.wallets.beneficiaries.confirmationModal.body.button.back" />
                        </Button>
                        <Button
                            className="text-uppercase"
                            onClick={handleSubmitConfirmModal}
                            disabled={isDisabled}
                            size="lg"
                            variant="primary"
                        >
                            <FormattedMessage id="page.body.wallets.beneficiaries.confirmationModal.body.button.submit" />
                        </Button>
                    </div>
                </div>
            </div>
        );
    }, [beneficiary, description, isWarningName, fullName, otpCode]);

    const handleRejectWarningModal = React.useCallback(() => {
        setWarningModal(true);
        handleToggleConfirmationModal();
        clearInputs();
    }, [isOpenWarningModal]);

    const handleCloseWarningModal = React.useCallback(() => {
        setWarningModal(true);
    }, [isOpenWarningModal]);

    return (
          <>
            <div className="cr-modal beneficiaries-modal">
                <div className="pg-container pg-confirm">
                    <div className="pg-confirm__logo">
                        <span></span>
                        <LogoIcon className="pg-logo__img"/>
                        <HugeCloseIcon className="cr-email-form__option-inner-close" onClick={handleToggleConfirmationModal}/>
                    </div>
                    <h3>
                        <FormattedMessage id="page.body.wallets.beneficiaries.confirmationModal.title" />
                    </h3>
                    <div className="beneficiaries-add-address-modal beneficiaries-add-address-modal--fiat">
                        {renderConfirmAddressModalBody}
                    </div>
                </div>
            </div>
            {(isCorrectName && !isOpenWarningModal) && <BeneficiariesWarningModal handleRejectWarningModal={handleRejectWarningModal} handleCloseWarningModal={handleCloseWarningModal} />}
          </>
    );
};

export const BeneficiariesConfirmModal = React.memo(BeneficiariesConfirmModalContentComponent);
