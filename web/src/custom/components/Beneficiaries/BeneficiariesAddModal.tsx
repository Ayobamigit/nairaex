import classnames from 'classnames';
import * as React from 'react';
import { Button } from 'react-bootstrap';
import { FormattedMessage, useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { HugeCloseIcon } from 'src/assets/images/CloseIcon';
import { LogoIcon } from 'src/assets/images/LogoIcon';
import { DropdownComponent } from 'src/components';
import { WarningMessage } from 'src/custom/components/WarningMessage';
import { CustomInput } from 'src/components/CustomInput';
import { BeneficiariesConfirmModal } from 'src/custom/components/Beneficiaries/BeneficiariesConfirmModal';
import { validateBeneficiaryAddress, validateBeneficiaryTestnetAddress } from 'src/custom/helpers';
import { Modal } from 'src/mobile/components/Modal';
import {
    alertPush,
    beneficiariesCreate,
    BeneficiaryBank,
    selectBanks,
    selectBeneficiariesCreateError,
    selectMobileDeviceState,
} from 'src/modules';

interface Props {
    currency: string;
    type: 'fiat' | 'coin';
    handleToggleAddAddressModal: () => void;
}

const BeneficiariesAddModalComponent: React.FC<Props> = ({ type, handleToggleAddAddressModal, currency } : Props) => {
    const [coinAddress, setCoinAddress] = React.useState<string>('');
    const [coinBeneficiaryName, setCoinBeneficiaryName] = React.useState<string>('');
    const [coinDescription, setCoinDescription] = React.useState<string>('');
    const [coinDestinationTag, setCoinDestinationTag] = React.useState<string>('');
    const [coinAddressValid, setCoinAddressValid] = React.useState<boolean>(false);
    const [coinTestnetAddressValid, setCoinTestnetAddressValid] = React.useState<boolean>(false);
    const [coinAddressFocused, setCoinAddressFocused] = React.useState<boolean>(false);
    const [coinBeneficiaryNameFocused, setCoinBeneficiaryNameFocused] = React.useState<boolean>(false);
    const [coinDescriptionFocused, setCoinDescriptionFocused] = React.useState<boolean>(false);
    const [coinDestinationTagFocused, setCoinDestinationTagFocused] = React.useState<boolean>(false);

    const [fiatAccountNumber, setFiatAccountNumber] = React.useState<string>('');
    const [fiatDescription, setFiatDescription] = React.useState<string>('');
    const [fiatAccountNumberFocused, setFiatAccountNumberFocused] = React.useState<boolean>(false);
    const [fiatDescriptionFocused, setFiatDescriptionFocused] = React.useState<boolean>(false);

    const [selectedBank, setSelectedBank] = React.useState<number | null>(null);
    const [isOpenConfirmationModal, setConfirmationModal] = React.useState<boolean>(false);

    const { formatMessage } = useIntl();
    const dispatch = useDispatch();

    const translate = React.useCallback((id: string) => formatMessage({ id }), []);

    const banks = useSelector(selectBanks);
    const beneficiariesAddError = useSelector(selectBeneficiariesCreateError);
    const isMobileDevice = useSelector(selectMobileDeviceState);
    const isRipple = React.useMemo(() => currency === 'xrp', [currency]);

    const handleClearModalsInputs = React.useCallback(() => {
        setCoinAddress('');
        setCoinBeneficiaryName('');
        setCoinDescription('');
        setCoinDestinationTag('');
        setCoinAddressFocused(false);
        setCoinBeneficiaryNameFocused(false);
        setCoinDescriptionFocused(false);
        setCoinDestinationTagFocused(false);
        setCoinAddressValid(false);
        setCoinTestnetAddressValid(false);

        setFiatAccountNumberFocused(false);
        setFiatDescriptionFocused(false);
        setFiatAccountNumber('');
        setFiatDescription('');
        setSelectedBank(0);
    }, []);

    React.useEffect(() => {
        if (beneficiariesAddError && beneficiariesAddError.message) {
            if (beneficiariesAddError.message.indexOf('account.withdraw.not_permitted') > -1) {
                dispatch(alertPush({ message: beneficiariesAddError.message, type: 'error'}));
            }
        }
    }, [beneficiariesAddError]);

    const handleSubmitAddAddressCoinModal = React.useCallback(() => {
        const payload = {
            currency: currency || '',
            name: coinBeneficiaryName,
            data: JSON.stringify({
                address: (isRipple && coinDestinationTag ? `${coinAddress}?dt=${coinDestinationTag}` : coinAddress),
            }),
            ...(coinDescription && { description: coinDescription }),
        };

        dispatch(beneficiariesCreate(payload));
        handleClearModalsInputs();
    }, [coinAddress, coinBeneficiaryName, coinDescription, currency, coinDestinationTag, isRipple]);

    const getState = React.useCallback(key => {
        switch (key) {
            case 'coinAddress':
                return coinAddress;
            case 'coinBeneficiaryName':
                return coinBeneficiaryName;
            case 'coinDestinationTag':
                return coinDestinationTag;
            case 'coinDescription':
                return coinDescription;
            case 'coinAddressFocused':
                return coinAddressFocused;
            case 'coinBeneficiaryNameFocused':
                return coinBeneficiaryNameFocused;
            case 'coinDescriptionFocused':
                return coinDescriptionFocused;
            case 'coinDestinationTagFocused':
                return coinDestinationTagFocused;
            case 'fiatAccountNumber':
                return fiatAccountNumber;
            case 'fiatDescription':
                return fiatDescription;
            case 'fiatAccountNumberFocused':
                return fiatAccountNumberFocused;
            case 'fiatDescriptionFocused':
                return fiatDescriptionFocused;
            default:
                return '';
        }
    }, [
        coinAddress,
        coinAddressFocused,
        coinBeneficiaryName,
        coinBeneficiaryNameFocused,
        coinDescription,
        coinDescriptionFocused,
        coinDestinationTag,
        coinDestinationTagFocused,
        fiatAccountNumber,
        fiatAccountNumberFocused,
        fiatDescription,
        fiatDescriptionFocused
    ]);

    const validateCoinAddressFormat = React.useCallback((value: string) => {
        const coinAddressValidator = validateBeneficiaryAddress.cryptocurrency(currency, true);
        const coinAddressTestnetValidator = validateBeneficiaryTestnetAddress.cryptocurrency(currency, true);

        setCoinAddressValid(coinAddressValidator.test(value.trim()));
        setCoinTestnetAddressValid(coinAddressTestnetValidator.test(value.trim()));
    }, [currency]);

    const validateFiatAccountNumber = React.useCallback((value: string) => {
        if (value.length <= 10 && (value.match(/[0-9]$/) || !value)) {
            setFiatAccountNumber(value);
        }
    }, []);

    const handleChangeFieldValue = React.useCallback((key: string, value: string) => {
        switch (key) {
            case 'coinAddress':
                setCoinAddress(value);
                validateCoinAddressFormat(value);
                break;
            case 'coinBeneficiaryName':
                setCoinBeneficiaryName(value);
                break;
            case 'coinDescription':
                setCoinDescription(value);
                break;
            case 'coinDestinationTag':
                setCoinDestinationTag(value);
                break;
            case 'fiatAccountNumber':
                validateFiatAccountNumber(value);
                break;
            case 'fiatDescription':
                setFiatDescription(value);
                break;
            default:
                break;
        }
    }, []);

    const handleChangeFieldFocus = React.useCallback((key: string) => {
        switch (key) {
            case 'coinAddressFocused':
                setCoinAddressFocused(v => !v);
                break;
            case 'coinBeneficiaryNameFocused':
                setCoinBeneficiaryNameFocused(v => !v);
                break;
            case 'coinDescriptionFocused':
                setCoinDescriptionFocused(v => !v);
                break;
            case 'coinDestinationTagFocused':
                setCoinDestinationTagFocused(v => !v);
                break;
            case 'fiatAccountNumberFocused':
                setFiatAccountNumberFocused(v => !v);
                break;
            case 'fiatDescriptionFocused':
                setFiatDescriptionFocused(v => !v);
                break;
            default:
                break;
        }
    }, []);

    const renderAddAddressModalBodyItem = React.useCallback((field: string, optional?: boolean) => {
        const focused = Boolean(getState(`${field}Focused`));
        const focusedClass = classnames('cr-email-form__group', {
            'cr-email-form__group--focused': focused,
            'cr-email-form__group--optional': optional,
        });

        return (
            <div key={field} className={focusedClass}>
                <CustomInput
                    type="text"
                    label={translate(`page.body.wallets.beneficiaries.addAddressModal.body.${field}`)}
                    placeholder={focused ? '' : translate(`page.body.wallets.beneficiaries.addAddressModal.body.${field}`)}
                    defaultLabel={field}
                    handleChangeInput={value => handleChangeFieldValue(field, value)}
                    // @ts-ignore
                    inputValue={getState(field)}
                    handleFocusInput={() => handleChangeFieldFocus(`${field}Focused`)}
                    classNameLabel="cr-email-form__label"
                    classNameInput="cr-email-form__input"
                    autoFocus={field === 'coinAddress' || field === 'fiatName'}
                    labelVisible={focused}
                />
            </div>
        );
    }, [getState]);

    const renderInvalidAddressMessage = React.useMemo(() => {
        return (
            <div className="cr-email-form__group">
                <span className="pg-beneficiaries__error-text">
                    <FormattedMessage id="page.body.wallets.beneficiaries.addAddressModal.body.invalidAddress"/>
                </span>
            </div>
        );
    }, [coinAddress]);

    const renderTestnetAddressMessage = React.useMemo(() => {
        return (
            <div className="cr-email-form__group">
                <span className="pg-beneficiaries__warning-text">
                    <FormattedMessage id="page.body.wallets.beneficiaries.addAddressModal.body.testnetAddress"/>
                </span>
            </div>
        );
    }, [coinAddress]);

    const renderAddAddressModalCryptoBody = React.useMemo(() => {
        const isDisabled = !coinAddress || !coinBeneficiaryName || (!coinAddressValid && !coinTestnetAddressValid);

        return (
            <div className="cr-email-form__form-content">
                {renderAddAddressModalBodyItem('coinAddress')}
                {!coinAddressValid && !coinTestnetAddressValid && coinAddress && renderInvalidAddressMessage}
                {!coinAddressValid && coinTestnetAddressValid && coinAddress && renderTestnetAddressMessage}
                {renderAddAddressModalBodyItem('coinBeneficiaryName')}
                {renderAddAddressModalBodyItem('coinDescription', true)}
                {isRipple && renderAddAddressModalBodyItem('coinDestinationTag', true)}
                <div className="cr-email-form__button-wrapper">
                    <Button
                        disabled={isDisabled}
                        onClick={handleSubmitAddAddressCoinModal}
                        size="lg"
                        variant="primary"
                    >
                        <FormattedMessage id="page.body.wallets.beneficiaries.addAddressModal.body.button"/>
                    </Button>
                </div>
            </div>
        );
    }, [coinAddress, coinBeneficiaryName, coinDescription, coinDestinationTag, coinAddressValid, coinTestnetAddressValid]);

    const handleSubmitAddAddressFiatModal = React.useCallback(() => {
        setConfirmationModal(true);
    }, [
        fiatAccountNumber,
        fiatDescription,
        selectedBank,
    ]);

    const handleSelectBank = React.useCallback((index) => {
        setSelectedBank(index);
    }, []);

    const mapBanksToDropdown = React.useMemo(() => Array.isArray(banks) && banks.map(el => el.bank_name), [banks]);

    const renderWarningNames = React.useMemo(() => {
        return <FormattedMessage id="page.body.wallets.warning.banks.wrongData" />
    }, []);

    const renderWarningBanks = React.useMemo(() => {
        return <FormattedMessage id="page.body.wallets.beneficiaries.addAddressModal.body.invalidBanks"/>
    }, []);
    
    const selectedBankItem = React.useMemo(() => {
        if (!Array.isArray(banks)) {
            return null;
        }
        setSelectedBank(0);

        return 0;
    }, [banks]);

    const renderWarnings = React.useMemo(() => {
        return (
            <div>
                {selectedBankItem === null && <WarningMessage children={renderWarningNames} hint={'page.body.wallets.warning.banks.wrongData'}/>}
                {!banks.length && <WarningMessage children={renderWarningBanks} hint={'page.body.wallets.warning.banks.wrongData'}/>}
            </div>
        );
    }, [selectedBankItem, banks]);


    const renderDropdown  = React.useMemo(() => {
        const bank = banks[selectedBank]?.bank_name;

        if (selectedBankItem === null || !banks.length) return  renderWarnings;

        return (
            <DropdownComponent 
                className="cr-email-form__group"
                list={mapBanksToDropdown}
                onSelect={handleSelectBank}
                selectedValue={bank}
                placeholder={translate('page.body.wallets.beneficiaries.addAddressModal.body.dropdown.placeholder')}
            />
        )
    }, [banks, selectedBankItem]);

    const renderAddAddressModalFiatBody = React.useMemo(() => {
        const isDisabled = fiatAccountNumber.length !== 10 || selectedBankItem === null || !banks.length; 

        return (
            <div className="cr-email-form__form-content">
                {renderDropdown}
                {renderAddAddressModalBodyItem('fiatAccountNumber')}
                {renderAddAddressModalBodyItem('fiatDescription', true)}
                <div className="cr-email-form__button-wrapper">
                    <Button
                        disabled={isDisabled}
                        onClick={handleSubmitAddAddressFiatModal}
                        size="lg"
                        variant="primary"
                    >
                        <FormattedMessage id="page.body.wallets.beneficiaries.addAddressModal.body.button"/>
                    </Button>
                </div>
            </div>
        );
    }, [
        fiatAccountNumber,
        fiatDescription,
        selectedBank,
        selectedBankItem,
        banks,
    ]);

    const addModalClass = React.useMemo(() => classnames('beneficiaries-add-address-modal', {
        'beneficiaries-add-address-modal--coin': type === 'coin',
        'beneficiaries-add-address-modal--fiat': type === 'fiat',
    }), [type]);

    const renderAddContent = React.useMemo(() => {
        return (
            <div className="cr-modal beneficiaries-modal">
                <div className="pg-container pg-confirm">
                    <div className="pg-confirm__logo">
                        <span></span>
                        <LogoIcon className="pg-logo__img"/>
                        <HugeCloseIcon className="cr-email-form__option-inner-close" onClick={handleToggleAddAddressModal}/>
                    </div>
                    <h3 className="pg-confirm__title">
                        <FormattedMessage id="page.body.wallets.beneficiaries.confirmationModal.title" />
                    </h3>
                    <div className="pg-confirm__content">
                        <div className="cr-email-form">
                            {type === 'coin' ? renderAddAddressModalCryptoBody : renderAddAddressModalFiatBody}
                        </div>
                    </div>
                </div>
            </div>
        );
    }, [type, isMobileDevice, getState]);

    const renderConfirmationContent = React.useMemo( () => {
        const bank: BeneficiaryBank = banks[selectedBank];
        const data: BeneficiaryBank = {
            account_number: fiatAccountNumber,
            ...bank,
            ...(fiatDescription && { fiatDescription: fiatDescription }),
        };

        const beneficiary = {
            currency: currency || '',
            name: bank?.bank_name,
            data: data,
        };

        return (
            <BeneficiariesConfirmModal
                description={fiatDescription}
                beneficiary={beneficiary}
                handleToggleConfirmationModal={() => {setConfirmationModal(false);}}
            />
        );
    }, [fiatAccountNumber, fiatDescription, selectedBank]);

    if ( isMobileDevice ) {
        return (
            <Modal
                title={translate('page.body.wallets.beneficiaries.addAddressModal.header')}
                onClose={handleToggleAddAddressModal}
                isOpen>
                {renderAddContent}
            </Modal>
        )
    }

    return (isOpenConfirmationModal ? renderConfirmationContent : renderAddContent);
};

export const BeneficiariesAddModal = React.memo(BeneficiariesAddModalComponent);
