import React, { useEffect, useState } from 'react';
import tw from 'twin.macro';

import ActionButton from '@/components/common/ActionButton';
import { useLocalStorage } from '@/hooks/useLocalStorage';

const Form = tw.form`shadow-hard border border-black p-2 bg-white`;
const Input = tw.input`w-full border border-black outline-none p-2 font-mono text-sm`;

const PasswordForm: React.FC<{
  handleSubmit: (password: string) => unknown;
}> = ({ handleSubmit, ...props }) => {
  const [password, setPassword] = useState('');

  return (
    <Form {...props} onSubmit={() => handleSubmit(password)}>
      <h1 tw="text-xl font-bold font-primary">currence</h1>
      <p tw="text-sm font-primary">this page is password-protected</p>
      <Input
        tw="mt-2"
        onChange={(e) => setPassword(e.target.value)}
        placeholder="password"
        type="password"
      />
      <ActionButton tw="mt-2" kind="confirm">
        enter
      </ActionButton>
    </Form>
  );
};

const Wrapper = tw.main`min-h-screen w-screen flex items-center justify-center`;

const PasswordProtectedLayout: React.FC<{
  enabled?: boolean;
  password: string;
}> = ({ enabled = true, password, children }) => {
  const [savedPassword, setSavedPassword] = useLocalStorage(
    'flattery-saved-password',
    ''
  );
  const [ok, setOk] = useState(false);

  useEffect(() => {
    // check if we've already authenticated
    if (savedPassword === password) {
      setOk(true);
    } else {
      // reset in case we already had something and it was wrong
      setSavedPassword('');
    }
  });

  const handleSubmit = (pw: string) => {
    if (pw === password) {
      setOk(true);
      setSavedPassword(password); // save for the future
    }
  };

  if (ok || !enabled) {
    return <React.Fragment>{children}</React.Fragment>;
  } else {
    return (
      <Wrapper>
        <PasswordForm handleSubmit={handleSubmit} />
      </Wrapper>
    );
  }
};

export default PasswordProtectedLayout;
