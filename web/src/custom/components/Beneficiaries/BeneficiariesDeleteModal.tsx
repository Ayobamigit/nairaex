import classnames from 'classnames';
import * as React from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector} from 'react-redux';
import { Modal } from 'src/mobile/components/Modal';
import {
    selectMobileDeviceState,
    beneficiariesDelete,
} from 'src/modules';
import { HugeCloseIcon } from 'src/assets/images/CloseIcon';
import { LogoIcon } from 'src/assets/images/LogoIcon';
import { TwoFactorAuthComponent } from '../TwoFactorAuth';

interface Props {
    beneficiaryId: number;
    handleToggleDeleteModal: () => void;
}

const BeneficiariesDeleteModalComponent: React.FC<Props> = ({ beneficiaryId, handleToggleDeleteModal }: Props) => {
    const [otpCode, setOtpCode] = React.useState<string>('');

    const { formatMessage } = useIntl();
    const dispatch = useDispatch();

    const translate = React.useCallback((id: string) => formatMessage({ id }), []);

    const isMobileDevice = useSelector(selectMobileDeviceState);

    const handleSubmitDeleteModal = React.useCallback(() => {
        if (beneficiaryId) {
            const payload = {
                id: beneficiaryId,
                otp: otpCode,
            };

            dispatch(beneficiariesDelete(payload));
        }
    }, [otpCode, beneficiaryId]);

    const handleOtpChange = React.useCallback((otp: string) => { setOtpCode(otp) }, []);

    const renderDeleteModalBody = React.useMemo(() => {
        const title = translate('page.body.wallets.beneficiaries.deleteModal.title');
        const message = translate('page.body.wallets.beneficiaries.deleteModal.body');

        return (
            <div className="pg-confirm__content__body">
                <TwoFactorAuthComponent
                onSubmit={handleSubmitDeleteModal}
                title={title}
                buttonLabel='Confirm'
                message={message}
                otpCode={otpCode}
                handleOtpCodeChange={handleOtpChange}
                handleClose2fa={() => {}}
                showPasteButton={true}
                withoutCloseIcon={true}
                />
            </div>
        )
    }, [otpCode]);

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
                        <HugeCloseIcon className="cr-email-form__option-inner-close" onClick={handleToggleDeleteModal}/>
                    </div>
                    <div className="pg-confirm__content">
                        <div className={className}>
                            {renderDeleteModalBody}
                        </div>
                    </div>
                </div>
            </div>
        );
    }, [isMobileDevice, renderDeleteModalBody]);

    return (
        isMobileDevice ?
            <Modal
                onClose={handleToggleDeleteModal}
                title={translate('page.mobile.wallet.withdraw.modal.new.account')}
                isOpen>
                {renderContent}
            </Modal> : renderContent
    );
};

const BeneficiariesDeleteModal = React.memo(BeneficiariesDeleteModalComponent);

export {
    BeneficiariesDeleteModal,
};
