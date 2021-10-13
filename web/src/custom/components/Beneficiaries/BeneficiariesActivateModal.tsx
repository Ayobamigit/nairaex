import classnames from 'classnames';
import * as React from 'react';
import { useIntl, FormattedMessage } from 'react-intl';
import { useDispatch, useSelector} from 'react-redux';
import { Modal } from 'src/mobile/components/Modal';
import {
    beneficiariesActivate,
    Beneficiary,
    selectMobileDeviceState,
    beneficiariesResendPin,
} from 'src/modules';
import { HugeCloseIcon } from 'src/assets/images/CloseIcon';
import { LogoIcon } from 'src/assets/images/LogoIcon';
import { TwoFactorAuthComponent } from '../TwoFactorAuth';

interface Props {
    beneficiariesAddData: Beneficiary;
    handleToggleConfirmationModal: () => void;
}

const BeneficiariesActivateModalComponent: React.FC<Props> = ({ handleToggleConfirmationModal, beneficiariesAddData }: Props) => {
    const [confirmationModalCode, setConfirmationModalCode] = React.useState<string>('');

    const { formatMessage } = useIntl();
    const dispatch = useDispatch();

    const translate = React.useCallback((id: string) => formatMessage({ id }), []);

    const isMobileDevice = useSelector(selectMobileDeviceState);

    const handleSubmitConfirmationModal = React.useCallback(() => {
        if (beneficiariesAddData) {
            const payload = {
                pin: confirmationModalCode,
                id: beneficiariesAddData.id,
            };

            dispatch(beneficiariesActivate(payload));
        }
    }, [confirmationModalCode, dispatch, beneficiariesAddData]);

    const handleOtpChange = React.useCallback((otp: string) => { setConfirmationModalCode(otp) }, []);

    const handleResendPin = React.useCallback(() => {
        if (beneficiariesAddData) {
            const payload = {
                id: beneficiariesAddData.id,
            };

            dispatch(beneficiariesResendPin(payload))
        }
    }, []);

    const renderConfirmationModalBody = React.useMemo(() => {
        const title = translate('page.body.wallets.beneficiaries.confirmationModal.header');
        const message = translate('page.body.wallets.beneficiaries.confirmationModal.body.text')

        return (
            <div className="pg-confirm__content__body">
                <TwoFactorAuthComponent
                onSubmit={handleSubmitConfirmationModal}
                title={title}
                buttonLabel='Confirm'
                message={message}
                otpCode={confirmationModalCode}
                handleOtpCodeChange={handleOtpChange}
                handleClose2fa={() => {}}
                showPasteButton={true}
                withoutCloseIcon={true}
                />
                <span className="resend-pin btn btn-primary" onClick={handleResendPin}>
                    <FormattedMessage id="page.body.wallets.beneficiaries.confirmationModal.body.resendButton" />
                </span>
            </div>
        )
    }, [confirmationModalCode]);

    const className = React.useMemo(() => (
      classnames('beneficiaries-activate-modal', {
          'cr-modal': isMobileDevice,
      })
    ), [isMobileDevice])

    const renderContent = React.useMemo(() => {
        return (
            <div className="cr-modal beneficiaries-modal beneficiaries-activate-modal">
                <div className="pg-container pg-confirm">
                    <div className="pg-confirm__logo">
                        <span></span>
                        <LogoIcon className="pg-logo__img"/>
                        <HugeCloseIcon className="cr-email-form__option-inner-close" onClick={handleToggleConfirmationModal}/>
                    </div>
                    <div className="pg-confirm__content">
                        <div className={className}>
                            {renderConfirmationModalBody}
                        </div>
                    </div>
                </div>
            </div>
        );
    }, [isMobileDevice, renderConfirmationModalBody]);

    return (
        isMobileDevice ?
            <Modal
                onClose={handleToggleConfirmationModal}
                title={translate('page.mobile.wallet.withdraw.modal.new.account')}
                isOpen>
                {renderContent}
            </Modal> : renderContent
    );
};

const BeneficiariesActivateModal = React.memo(BeneficiariesActivateModalComponent);

export {
    BeneficiariesActivateModal,
};
