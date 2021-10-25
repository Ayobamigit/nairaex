import * as React from 'react';
import { Button } from 'react-bootstrap';
import { CodeVerification } from 'src/components/';
import { CloseIcon } from 'src/assets/images/CloseIcon';
import { useIntl } from 'react-intl';

export interface TwoFactorAuthProps {
    isMobile?: boolean;
    isLoading?: boolean;
    showPasteButton?: boolean;
    withoutCloseIcon?: boolean;
    onSubmit: () => void;
    title: string;
    buttonLabel: string;
    message: string;
    otpCode: string;
    handleOtpCodeChange: (otp: string) => void;
    handleClose2fa: () => void;
}

export const TwoFactorAuthComponent: React.FC<TwoFactorAuthProps> = (props) => {
    const {
        isMobile,
        isLoading,
        title,
        message,
        otpCode,
        buttonLabel,
        onSubmit,
        handleOtpCodeChange,
        handleClose2fa,
        showPasteButton,
        withoutCloseIcon,
    } = props;

    const { formatMessage } = useIntl();

    const translate = React.useCallback((id: string) => formatMessage({ id }), []);

    const handleEnterPress = React.useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && otpCode.length >= 6) {
            event.preventDefault();
            onSubmit();
        }
    }, [onSubmit, otpCode]);

    const handlerPasteFromClipboard = React.useCallback(async () => {
        const pin: string = (await navigator.clipboard.readText()).replace(/[^0-9]/g, '').substr(0, 6);

        handleOtpCodeChange(pin);
    }, []);

    return (
        <div className="pg-2fa___form">
            <form>
                <div className="cr-email-form">
                    <div className="cr-email-form__options-group">
                        <div className="cr-email-form__option">
                            <div className="cr-email-form__option-inner">
                                {title || '2FA verification'}
                                {!withoutCloseIcon &&
                                    <div className="cr-email-form__cros-icon" onClick={handleClose2fa}>
                                        <CloseIcon className="close-icon" />
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="cr-email-form__form-content">
                        <div className="cr-email-form__header">{message}</div>
                            <div className="cr-email-form__group with-button">
                                <CodeVerification
                                  code={otpCode}
                                  onChange={handleOtpCodeChange}
                                  onSubmit={handleEnterPress}
                                  codeLength={6}
                                  type="text"
                                  placeholder="X"
                                  inputMode="decimal"
                                  showPaste2FA={true}
                                  isMobile={isMobile}
                                />
                            {showPasteButton &&
                                <Button className="paste-btn" onClick={handlerPasteFromClipboard}>
                                    {translate('page.body.2fa.paste').toUpperCase()}
                                </Button>
                            }
                        </div>
                        <div className="cr-email-form__button-wrapper">
                            <Button
                              disabled={isLoading || otpCode.length < 6}
                              onClick={onSubmit}
                              size="lg"
                              variant="primary">
                              {isLoading ? translate('page.body.2fa.loading') : buttonLabel ? buttonLabel : translate('page.body.2fa.singIn')}
                            </Button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export const TwoFactorAuth = React.memo(TwoFactorAuthComponent);
