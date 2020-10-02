import React from 'react';
import { FormTypes, LoginFields } from '../index';
import styled from 'styled-components';

const Row = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;
export const FormContentLayout = ({
  formType,
  userData,
  onInputChange,
}: IFormContentLayout) => {
  if (formType === FormTypes.REGISTER) {
    return (
      <>
        {Object.values(LoginFields).map((inputElem) => {
          const fieldName = inputElem as LoginFields;
          return (
            <Row key={fieldName}>
              <span>{fieldName}</span>
              <input
                value={userData[fieldName]}
                onChange={(event) => onInputChange(event, fieldName)}
              />
            </Row>
          );
        })}
      </>
    );
  } else {
    return (
      <>
        {Object.values(LoginFields)
          .filter((elem) => elem !== LoginFields.NAME)
          .map((inputElem) => {
            const fieldName = inputElem as LoginFields;
            return (
              <Row key={fieldName}>
                <span>{fieldName}</span>
                <input
                  value={userData[fieldName]}
                  onChange={(event) => onInputChange(event, fieldName)}
                />
              </Row>
            );
          })}
      </>
    );
  }
};

interface IFormContentLayout {
  formType: FormTypes;
  onInputChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    arg: LoginFields
  ) => void;
  userData: { [key in LoginFields]: string };
}
