import React, { RefObject, useEffect, useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import {
  createDefaultFieldFactory,
  FieldTypes,
  ValueFieldProps,
} from '@sitecore-jss/sitecore-jss-react-forms';

export const AllFieldTypes = {
  ...FieldTypes,
  GoogleRecaptcha: '{id here from path : /sitecore/system/Settings/Forms/Field Types/Security/Google Recaptcha}',
};

const CustomFieldFactory = createDefaultFieldFactory();

type ReCaptchaProps = ReCAPTCHA & {
  captcha: {
    parentElement: {
      querySelector: (arg0: string) => Element | null;
    };
  };
};

CustomFieldFactory.setComponent(AllFieldTypes.GoogleRecaptcha, ({ field }: ValueFieldProps) => {
  const [errorMessage, setErrorMessage] = useState<boolean>(false);
  const recaptcha: RefObject<ReCaptchaProps> = useRef(null);

  const handleRecaptchaChange = (value: string) => {
    value?.length > 0 && setErrorMessage(false);
  };

  useEffect(() => {
    let formButton;
    if (recaptcha?.current != null) {
      formButton = recaptcha?.current?.captcha?.parentElement?.querySelector('[type = "submit"]');
    }

    formButton &&
      formButton?.addEventListener('click', (e) => {
        const captchaValue = recaptcha?.current?.getValue();
        if (captchaValue?.length === 0) {
          setErrorMessage(true);
          recaptcha?.current?.reset();
          e.preventDefault();
        }
      });
  }, [recaptcha]);

  return (
    <>
      <ReCAPTCHA
        sitekey={field?.model?.publicKey as string}
        onChange={handleRecaptchaChange}
        ref={recaptcha}
      />
      {errorMessage && <span>{field?.model?.errorMessage as string}</span>}
    </>
  );
});

export default CustomFieldFactory;
