import * as React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Modal } from 'src/mobile/components/Modal';
import Attention from 'src/assets/images/Attention';
import { HugeCloseIcon } from 'src/assets/images/CloseIcon';
import { Button } from 'react-bootstrap';

interface Props {
  handleRejectWarningModal: () => void;
  handleCloseWarningModal: () => void;
  isMobileDevice?: boolean;
}

const BeneficiariesWarningModalComponent: React.FC<Props> = (props: Props) => {
    const { formatMessage } = useIntl();
    const { handleCloseWarningModal, handleRejectWarningModal, isMobileDevice } = props;

    const translate = React.useCallback((id: string) => formatMessage({ id }), []);

    const renderWarningModalBody = React.useMemo(() => {
        return (
            <div className="cr-email-form__form-warning-body">
                <Attention/>
                <h3 className="pg-beneficiaries__warning-modal__title">
                    <FormattedMessage id={'page.body.wallets.beneficiaries.warningModal.header'}/>
                </h3>
                <span className="pg-beneficiaries__warning-modal__description">
                    <FormattedMessage id={'page.body.wallets.beneficiaries.warningModal.body'}/>
                </span>
                <div className="cr-warning-modal__button-wrapper">
                    <Button
                        className="text-uppercase"
                        size="lg"
                        variant="secondary"
                        onClick={handleRejectWarningModal}
                    >
                        <FormattedMessage id="page.body.wallets.beneficiaries.warningModal.cancel"/>
                    </Button>
                    <Button
                        className="text-uppercase"
                        size="lg"
                        variant="primary"
                        onClick={handleCloseWarningModal}
                    >
                      <FormattedMessage id="page.body.wallets.beneficiaries.warningModal.continue"/>
                    </Button>
                </div>
            </div>
        );
    }, []);

    const renderContent = React.useMemo(() => {
        return (
             <div className="cr-modal beneficiaries-modal">
                <div className="pg-container pg-confirm">
                    <div className="pg-confirm__logo">
                        <span></span>
                        <HugeCloseIcon className="cr-email-form__option-inner-close" onClick={handleRejectWarningModal}/>
                    </div>
                    <div className="pg-confirm__content">
                        <div className="cr-email-form__form-warning">
                            <div className="beneficiaries-add-address-modal">
                                <div className="cr-email-form__form">
                                    {renderWarningModalBody}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }, [isMobileDevice]);

    return (
        props.isMobileDevice ?
            <Modal
                isOpen
                onClose={handleRejectWarningModal}
                title={translate('page.body.wallets.beneficiaries.failAddModal.content')}>
                {renderContent}
            </Modal> : renderContent
    );
};

const BeneficiariesWarningModal = React.memo(BeneficiariesWarningModalComponent);

export {
    BeneficiariesWarningModal,
};
