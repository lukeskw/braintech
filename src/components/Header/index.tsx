import { ViewProps } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { CategoryTypeProps } from '../../@types/categoryTypeProps'

import { IconButton } from '@components/IconButton'
import { ChipCategory } from '@components/ChipCategory'

import { Container, LeftContainer, Title, TitleHighlight } from './styles'

type Props = ViewProps & {
  title: string;
  titleHighlight?: string;
  category?: CategoryTypeProps;
  isGoBackButtonDisabled?: boolean;
}

export function Header({ title, category, isGoBackButtonDisabled = false, titleHighlight, ...rest }: Props) {

  const { goBack } = useNavigation()

  return (
    <Container {...rest}>
      <LeftContainer>
        <IconButton
          onPress={goBack}
          icon='arrow-left'
          disabled={isGoBackButtonDisabled}
        />

        {titleHighlight ? (
          <TitleHighlight>
            {`${title}: `}
            <Title>
              {titleHighlight}
            </Title>
          </TitleHighlight>
        ) : (
          <Title>
            {title}
          </Title>
        )}
      </LeftContainer>

      {category && <ChipCategory category={category} />}
    </Container>
  )
}