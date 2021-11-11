import classnames from 'classnames';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import {
    beneficiariesCreateData,
    beneficiariesDelete,
    Beneficiary,
    BeneficiaryBank,
    memberLevelsFetch,
    selectBeneficiaries,
    selectBeneficiariesActivateSuccess,
    selectBeneficiariesCreate,
    selectBeneficiariesCreateSuccess,
    selectMemberLevels,
    selectMobileDeviceState,
    selectUserInfo,
    sendError,
    beneficiariesResetState,
    selectBeneficiariesDeleteSuccess,
    selectBanks,
    banksFetch
} from 'src/modules';
import { ChevronIcon } from 'src/assets/images/ChevronIcon';
import { PlusIcon } from 'src/assets/images/PlusIcon';
import { TipIcon } from 'src/assets/images/TipIcon';
import { TrashBin } from 'src/assets/images/TrashBin';
import { BeneficiariesActivateModal } from './BeneficiariesActivateModal';
import { BeneficiariesAddModal } from './BeneficiariesAddModal';
import { BeneficiariesFailAddModal } from './BeneficiariesFailAddModal';
import { BeneficiariesDeleteModal } from './BeneficiariesDeleteModal';

interface OwnProps {
    currency: string;
    type: 'fiat' | 'coin';
    onChangeValue: (beneficiary: Beneficiary) => void;
}

const defaultBeneficiary: Beneficiary = {
    id: 0,
    currency: '',
    name: '',
    state: '',
    data: {
        address: '',
        full_name: '',
    },
};

type Props = OwnProps;

const BeneficiariesComponent: React.FC<Props> = ({currency, type, onChangeValue}: Props) => {
    const [currentWithdrawalBeneficiary, setWithdrawalBeneficiary] = React.useState<Beneficiary>(defaultBeneficiary);
    const [isOpenAddressModal, setAddressModalState] = React.useState<boolean>(false);
    const [isOpenConfirmationModal, setConfirmationModalState] = React.useState<boolean>(false);
    const [isOpenFailModal, setFailModalState] = React.useState<boolean>(false);
    const [isOpenDeleteModal, setDeleteModalState] = React.useState<boolean>(false);
    const [isOpenTip, setTipState] = React.useState<boolean>(false);
    const [isOpenDropdown, setDropdownState] = React.useState<boolean>(false);
    const [beneficiaryId, setBeneficiaryId] = React.useState<number | null>(null);


    const dispatch = useDispatch();

    /*    selectors    */
    const beneficiaries = useSelector(selectBeneficiaries);
    const beneficiariesAddData = useSelector(selectBeneficiariesCreate);
    const beneficiariesAddSuccess = useSelector(selectBeneficiariesCreateSuccess);
    const beneficiariesActivateSuccess = useSelector(selectBeneficiariesActivateSuccess);
    const beneficiariesDeleteSuccess = useSelector(selectBeneficiariesDeleteSuccess);
    const memberLevels = useSelector(selectMemberLevels);
    const userData = useSelector(selectUserInfo);
    const banks = useSelector(selectBanks);
    const isMobileDevice = useSelector(selectMobileDeviceState);
    /*    ---------    */

    React.useEffect(() => {
        if (beneficiaries) {
            handleSetCurrentAddressOnUpdate(beneficiaries);
        }

        if (!memberLevels) {
            dispatch(memberLevelsFetch());
        }

        if (!banks.length){
            dispatch(banksFetch());
        }
    }, []);

    React.useEffect(() => {
        if (currency || beneficiariesDeleteSuccess) {
            dispatch(beneficiariesResetState());
            setDeleteModalState(false);
            setBeneficiaryId(null);
        }
    }, [currency, beneficiariesDeleteSuccess]);

    React.useEffect(() => {
        if (beneficiaries) {
            handleSetCurrentAddressOnUpdate(beneficiaries);
        }

        if (beneficiariesAddSuccess) {
            setAddressModalState(false);
            setConfirmationModalState(true);
        }

        if (beneficiariesActivateSuccess) {
            setConfirmationModalState(false);
            dispatch(beneficiariesResetState());
        }

        if(beneficiaryId) {
            setDeleteModalState(true);
        }
    }, [beneficiaries, beneficiariesAddSuccess, beneficiariesActivateSuccess, beneficiaryId]);

    const handleDeleteAddress = React.useCallback((item: Beneficiary) => {
        setBeneficiaryId(item.id);
    }, []);

    const handleClickSelectAddress = React.useCallback((item: Beneficiary) => {
        if (item.state && item.state.toLowerCase() === 'pending') {
            dispatch(beneficiariesCreateData(item));
            setConfirmationModalState(true);
        } else {
            handleSetCurrentAddress(item);
        }
    }, []);

    const handleSetCurrentAddress = React.useCallback((item: Beneficiary) => {
        if (item.data) {
            setWithdrawalBeneficiary(item);
            setDropdownState(false);
            onChangeValue(item);
        }
    }, []);

    const handleFilterByState = React.useCallback((beneficiariesList: Beneficiary[], filter: string | string[]) => {
        if (beneficiariesList.length) {
            return beneficiariesList.filter(item => filter.includes(item.state.toLowerCase()));
        }

        return [];
    }, []);

    const handleClickToggleAddAddressModal = React.useCallback(() => {
        if (memberLevels && (userData.level < memberLevels.withdraw.minimum_level)) {
            setFailModalState(true);
        } else if (beneficiaries && beneficiaries.length >= 10) {
            dispatch(sendError({
                error: { message: ['error.beneficiaries.max10.addresses'] },
                processingType: 'alert',
            }));
        } else {
            setAddressModalState(true);
        }
    }, [beneficiaries, memberLevels, userData]);

    const handleSetCurrentAddressOnUpdate = React.useCallback((beneficiariesList: Beneficiary[]) => {
        let filteredByState = handleFilterByState(beneficiariesList, 'active');

        if (!filteredByState.length) {
            filteredByState = handleFilterByState(beneficiariesList, 'pending');
        }

        if (filteredByState.length) {
            handleSetCurrentAddress(filteredByState[0]);
        }
    }, []);

    const renderAddAddress = React.useMemo(() => {
        return (
            <div className="pg-beneficiaries__add" onClick={() => handleClickToggleAddAddressModal()}>
                <span className="pg-beneficiaries__add__label">
                    <FormattedMessage id="page.body.wallets.beneficiaries.addAddress" />
                </span>
                <PlusIcon className="pg-beneficiaries__add__icon" />
            </div>
        );
    }, [handleClickToggleAddAddressModal]);

    const renderDropdownTipCryptoNote = React.useMemo(() => {
        return (
            <div className="tip__content__block">
                <span className="tip__content__block__label">
                    <FormattedMessage id="page.body.wallets.beneficiaries.tipDescription" />
                </span>
                <span className="tip__content__block__value">{currentWithdrawalBeneficiary.description}</span>
            </div>
        );
    }, []);

    const renderDropdownTipCrypto = React.useMemo(() => {
        if (currentWithdrawalBeneficiary) {
            return (
                <div className="pg-beneficiaries__dropdown__tip tip">
                    <div className="tip__content">
                        <div className="tip__content__block">
                            <span className="tip__content__block__label">
                                <FormattedMessage id="page.body.wallets.beneficiaries.tipAddress" />
                            </span>
                            <span className="tip__content__block__value">{currentWithdrawalBeneficiary.data.address}</span>
                        </div>
                        <div className="tip__content__block">
                            <span className="tip__content__block__label">
                                <FormattedMessage id="page.body.wallets.beneficiaries.tipName" />
                            </span>
                            <span className="tip__content__block__value">{currentWithdrawalBeneficiary.name}</span>
                        </div>
                        {currentWithdrawalBeneficiary.description && renderDropdownTipCryptoNote}
                    </div>
                </div>
            );
        }

        return null;
    }, [currentWithdrawalBeneficiary]);

    const renderDropdownTipFiatDescription = React.useMemo(() => {
        return (
            <div className="tip__content__block">
                <span className="tip__content__block__label">
                    <FormattedMessage id="page.body.wallets.beneficiaries.dropdown.fiat.description" />
                </span>
                <span className="tip__content__block__value">{currentWithdrawalBeneficiary.data.fiatDescription}</span>
            </div>
        );
    }, [currentWithdrawalBeneficiary]);

    const renderDropdownTipFiat = React.useMemo(() => {
        if (currentWithdrawalBeneficiary) {
            return (
                <div className="pg-beneficiaries__dropdown__tip tip">
                    <div className="tip__content">
                        {(currentWithdrawalBeneficiary.data as BeneficiaryBank).fiatDescription && renderDropdownTipFiatDescription}
                        <div className="tip__content__block">
                            <span className="tip__content__block__label">
                                <FormattedMessage id="page.body.wallets.beneficiaries.dropdown.fiat.fullName" />
                            </span>
                            <span className="tip__content__block__value">
                                {(currentWithdrawalBeneficiary.data as BeneficiaryBank).full_name}
                            </span>
                        </div>
                        <div className="tip__content__block">
                            <span className="tip__content__block__label">
                                <FormattedMessage id="page.body.wallets.beneficiaries.dropdown.fiat.accountNumber" />
                            </span>
                            <span className="tip__content__block__value">
                                {(currentWithdrawalBeneficiary.data as BeneficiaryBank).account_no}
                            </span>
                        </div>
                        <div className="tip__content__block">
                            <span className="tip__content__block__label">
                                <FormattedMessage id="page.body.wallets.beneficiaries.dropdown.fiat.bankName" />
                            </span>
                            <span className="tip__content__block__value">
                                {currentWithdrawalBeneficiary.name}
                            </span>
                        </div>
                        <div className="tip__content__block">
                            <span className="tip__content__block__label">
                                <FormattedMessage id="page.body.wallets.beneficiaries.dropdown.fiat.bankCode" />
                            </span>
                            <span className="tip__content__block__value">
                                {banks.filter(el => el.bank_name == currentWithdrawalBeneficiary.name)[0]?.bank_code}
                            </span>
                        </div>
                    </div>
                </div>
            );
        }

        return null;
    }, [isOpenDropdown, currentWithdrawalBeneficiary, banks]);

    const renderDropdownItem = React.useCallback((item: Beneficiary, index: number, type: OwnProps['type']) => {
        const isPending = item.state && item.state.toLowerCase() === 'pending';
        const itemClassName = classnames('pg-beneficiaries__dropdown__body__item item', {
            'item--pending': isPending,
        });

        if (type === 'fiat') {
            return (
                <div key={index} className={itemClassName}>
                    <div className="item__left" onClick={() => handleClickSelectAddress(item)}>
                        <span className="item__left__title">
                            <FormattedMessage id="page.body.wallets.beneficiaries.dropdown.fiat.name" />
                        </span>
                        <span className="item__left__address">
                            {item.name}
                        </span>
                    </div>
                    <div className="item__left" onClick={() => handleClickSelectAddress(item)}>
                        <span className="item__left__title">
                            <FormattedMessage id="page.body.wallets.beneficiaries.dropdown.fiat.fullName" />
                        </span>
                        <span className="item__left__address">
                            {item.data ? (item.data as BeneficiaryBank).full_name : ''}
                        </span>
                    </div>
                    <div className="item__right">
                        {isPending && (
                            <span className="item__right__pending" onClick={() => handleClickSelectAddress(item)}>
                                <FormattedMessage id="page.body.wallets.beneficiaries.dropdown.pending" />
                            </span>
                        )}
                        <span className="item__right__delete" onClick={() => handleDeleteAddress(item)}>
                            <TrashBin/>
                        </span>
                    </div>
                </div>
            );
        }

        return (
            <div key={index} className={itemClassName}>
                <div className="item__left" onClick={() => handleClickSelectAddress(item)}>
                    <span className="item__left__title">
                        <FormattedMessage id="page.body.wallets.beneficiaries.dropdown.name" />
                    </span>
                    <span className="item__left__address">
                        {item.name}
                    </span>
                </div>
                <div className="item__right">
                    {isPending ? (
                        <span className="item__right__pending">
                            <FormattedMessage id="page.body.wallets.beneficiaries.dropdown.pending" />
                        </span>
                    ) : null}
                    <span className="item__right__delete" onClick={() => handleDeleteAddress(item)}>
                        <TrashBin/>
                    </span>
                </div>
            </div>
        );
    }, [type]);

    const renderDropdownBody = React.useMemo(() => {
        return (
            <div className='pg-beneficiaries__dropdown__body'>
                {beneficiaries && beneficiaries.map((item, index) => renderDropdownItem(item, index, type))}
                <div className="pg-beneficiaries__dropdown__body__add add" onClick={() => handleClickToggleAddAddressModal()}>
                    <span className="add__label">
                        <FormattedMessage id="page.body.wallets.beneficiaries.addAddress" />
                    </span>
                    <PlusIcon className="add__icon" />
                </div>
            </div>
        );
    }, [beneficiaries, handleClickToggleAddAddressModal]);

    const dropdownClassName = React.useMemo(() => classnames('pg-beneficiaries__dropdown', {'pg-beneficiaries__dropdown--open': isOpenDropdown}), [isOpenDropdown]);

    const renderAddressDropdown = React.useMemo(() => {
        const isPending = currentWithdrawalBeneficiary.state && currentWithdrawalBeneficiary.state.toLowerCase() === 'pending';

        if (type === 'fiat') {
            return (
                <div className={dropdownClassName}>
                    <div className="pg-beneficiaries__dropdown__select select" onClick={() => setDropdownState(!isOpenDropdown)}>
                        <div className="select__left">
                            <span className="select__left__title">
                                <FormattedMessage id="page.body.wallets.beneficiaries.dropdown.fiat.name" />
                            </span>
                            <span className="select__left__address">{currentWithdrawalBeneficiary.name}</span>
                        </div>
                        <div className="select__left">
                            <span className="select__left__title">
                                <FormattedMessage id="page.body.wallets.beneficiaries.dropdown.fiat.fullName" />
                            </span>
                            <span className="select__left__address">{currentWithdrawalBeneficiary.data ? (currentWithdrawalBeneficiary.data as BeneficiaryBank).full_name : ''}</span>
                        </div>
                        <div className="select__right">
                            {isPending ? (
                                <span className="select__right__pending">
                                  <FormattedMessage id="page.body.wallets.beneficiaries.dropdown.pending" />
                                </span>
                            ) : null}
                            <span className="select__right__tip" onMouseOver={() => setTipState(true)} onMouseOut={() => setTipState(false)}><TipIcon/></span>
                            <span className="select__right__select">
                                <FormattedMessage id="page.body.wallets.beneficiaries.dropdown.select" />
                            </span>
                            <span className="select__right__chevron"><ChevronIcon /></span>
                        </div>
                    </div>
                    {isOpenDropdown && renderDropdownBody}
                    {isOpenTip && renderDropdownTipFiat}
                </div>
            );
        }

        return (
            <div className={dropdownClassName}>
                <div className="pg-beneficiaries__dropdown__select select" onClick={() => setDropdownState(!isOpenDropdown)}>
                    <div className="select__left">
                        <span className="select__left__title">
                            <FormattedMessage id="page.body.wallets.beneficiaries.dropdown.name" />
                        </span>
                        <span className="select__left__address">
                            <span>
                                {currentWithdrawalBeneficiary.name}
                            </span>
                        </span>
                    </div>
                    <div className="select__right">
                        {isPending ? (
                            <span className="select__right__pending">
                                <FormattedMessage id="page.body.wallets.beneficiaries.dropdown.pending" />
                            </span>
                        ) : null}
                        <span className="select__right__tip" onMouseOver={() => setTipState(true)} onMouseOut={() => setTipState(false)}>
                            <TipIcon/>
                        </span>
                        <span className="select__right__select">
                            <FormattedMessage id="page.body.wallets.beneficiaries.dropdown.select" />
                        </span>
                        <span className="select__right__chevron"><ChevronIcon /></span>
                    </div>
                </div>
                {isOpenDropdown && renderDropdownBody}
                {isOpenTip && renderDropdownTipCrypto}
            </div>
        );
    }, [isOpenDropdown, isOpenTip, currentWithdrawalBeneficiary, type]);

    const handleToggleDeleteModal = React.useCallback(() => {
        setDeleteModalState(false);
        setBeneficiaryId(null);
    }, [beneficiaryId, isOpenDeleteModal])

    const renderBeneficiariesAddModal = React.useMemo(() => {
        if (isOpenAddressModal) {
            return (
                <BeneficiariesAddModal
                    currency={currency}
                    type={type}
                    handleToggleAddAddressModal={() => setAddressModalState(false)}
                />
            );
        }
    }, [currency, type, isOpenAddressModal]);

    const renderActivateModal = React.useMemo(() => {
        return (
            <BeneficiariesActivateModal
                beneficiariesAddData={beneficiariesAddData}
                handleToggleConfirmationModal={() => setConfirmationModalState(false)}
            />
        );
    }, [beneficiariesAddData]);

    const renderFailModal = React.useMemo(() => {
        return (
            <BeneficiariesFailAddModal
                isMobileDevice={isMobileDevice}
                handleToggleFailModal={() => setFailModalState(false)}
            />
        );
    }, [isMobileDevice]);

    const renderDeleteModal = React.useMemo(() => {
        return (
            <BeneficiariesDeleteModal
                beneficiaryId={beneficiaryId}
                handleToggleDeleteModal={handleToggleDeleteModal}
            />
        );
    }, [isMobileDevice, beneficiaryId]);
    
    const filtredBeneficiaries = React.useMemo(() => handleFilterByState(beneficiaries, ['active', 'pending']), [beneficiaries]);

    return (
        <div className="pg-beneficiaries">
            {filtredBeneficiaries.length ? renderAddressDropdown : renderAddAddress}
            {renderBeneficiariesAddModal}
            {isOpenConfirmationModal && renderActivateModal}
            {isOpenFailModal && renderFailModal}
            {isOpenDeleteModal && renderDeleteModal}
        </div>
    );
}

const Beneficiaries = React.memo(BeneficiariesComponent);

export {
    Beneficiaries,
};
