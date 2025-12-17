import Colors from '../../theme/theme.colors';

import styled from 'styled-components';

export const HeaderContainer = styled.div`
  width: 100%;
  background-color: ${Colors.background.dark};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  color: ${Colors.text.white};

  @media (max-width: 7668px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

export const HeaderTitle = styled.h2`
  font-weight: bold;
  font-size: 1.5rem;
  &:hover {
    cursor: pointer;
  }

  @media (max-width: 768px) {
    margin-bottom: 16px;
  }
`;

export const HeaderItems = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: space-evenly;
  }
`;

export const HeaderItem = styled.div`
  font-weight: 600;
  font-size: 1rem;
  display: flex;
  align-items: center;

  &:hover {
    cursor: pointer;
  }

  &:nth-child(1),
  &:nth-child(2),
  &:nth-child(3) {
    margin-right: 40px;
  }

  @media (max-width: 768px) {
    margin-right: 0;
  }
`;
