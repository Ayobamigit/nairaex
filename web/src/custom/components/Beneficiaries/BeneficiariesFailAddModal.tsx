import classnames from 'classnames';
import * as React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import { Modal } from 'src/mobile/components/Modal';

interface Props {
    handleToggleFailModal: () => void;
    isMobileDevice?: boolean;
}

const BeneficiariesFailAddModalComponent: React.FC<Props> = ({handleToggleFailModal, isMobileDevice}: Props) => {
    const { formatMessage } = useIntl();

    const translate = React.useCallback((id: string) => formatMessage({ id }), []);

    const ModalHeader = React.useMemo(() => (
        <div className="cr-email-form__options-group">
            <div className="cr-email-form__option">
                <div className="cr-email-form__option-inner">
                    <FormattedMessage id="page.body.wallets.beneficiaries.failAddModal.header" />
                    <span
                        className="pg-profile-page__close pg-profile-page__pull-right"
                        onClick={handleToggleFailModal}
                    />
                </div>
            </div>
        </div>
    ), []);

    const ModalBody = React.useMemo(() => (
        <div className="cr-email-form__form-content">
            <span className="cr-email-form__form-content__info">
                <FormattedMessage id="page.body.wallets.beneficiaries.failAddModal.content" />
            </span>
            <div className="cr-email-form__button-wrapper">
                <Link className="btn btn-primary btn-lg cr-email-form__button-wrapper__btn" to="/confirm">
                    <FormattedMessage id="page.body.wallets.beneficiaries.failAddModal.button" />
                </Link>
            </div>
        </div>
    ), []);

    const className = React.useMemo(()  => classnames('beneficiaries-fail-modal', { 'cr-modal': !isMobileDevice}), [isMobileDevice]);

    const renderContent = React.useMemo(() => (
        <div className={className}>
            <div className="cr-email-form">
                {ModalHeader}
                {ModalBody}
            </div>
        </div>
    ), []);

    return (
        isMobileDevice ?
            <Modal
                isOpen
                onClose={handleToggleFailModal}
                title={translate('page.body.wallets.beneficiaries.failAddModal.content')}>
                {renderContent}
            </Modal> : renderContent
    );
};

const BeneficiariesFailAddModal = React.memo(BeneficiariesFailAddModalComponent);

export {
    BeneficiariesFailAddModal,
};
