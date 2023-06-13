import styled, { css } from 'styled-components/native'

import { CategoryTypeProps } from '../../@types/categoryTypeProps';

type ContainerProps = {
  isActive: boolean;
}

type IconContainerProps = {
  category: CategoryTypeProps
}

export const Container = styled.Pressable<ContainerProps>`
  flex: 1;
  min-height: 80px;
  max-height: 80px;
  margin-bottom: 12px;
  flex-direction: row;
  align-items: center;
  border: 1px solid transparent;
  justify-content: space-between;

  ${({ theme, isActive }) => css`
    padding: ${theme.PADDING}px;
    border-radius: ${theme.BORDER_RADIUS}px;
    border-color: ${isActive ? theme.COLORS.PRIMARY : 'transparent'};
    background-color: ${isActive ? theme.COLORS.PRIMARY_10 : theme.COLORS.CARD};  
  `}
`;

export const ContentContainer = styled.View`
  flex-direction: row;
  align-items: center;
`

export const IconContainer = styled.View<IconContainerProps>`
  width: 37px;
  height: 37px;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.BORDER_RADIUS}px;

  ${({ category }) => {
    switch (category) {
      case 'FRONT-END':
        return css`
          background-color: ${({ theme }) => theme.COLORS.FRONT_END_10};
        `;

      case 'BACK-END':
        return css`
          background-color: ${({ theme }) => theme.COLORS.BACK_END_10};
        `;

      case 'MOBILE':
        return css`
          background-color: ${({ theme }) => theme.COLORS.MOBILE_10};
        `;

      default:
    }
  }}
`

export const TextContainer = styled.View`
  margin-left: 8px;
`

export const Title = styled.Text`
  font-size: 16px;

  ${({ theme }) => css`
    color: ${theme.COLORS.WHITE};
    font-family: ${theme.FONTS.BOLD};
  `}
`

export const QuestionsQuantity = styled.Text`
  font-size: 12px;

  ${({ theme }) => css`
    color: ${theme.COLORS.GRAY};
    font-family: ${theme.FONTS.REGULAR};
  `}
`