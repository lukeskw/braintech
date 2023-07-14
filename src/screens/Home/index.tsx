import { useEffect } from "react"
import { FlatList } from "react-native"
import { useNavigation } from "@react-navigation/native"
import Animated, { FadeInLeft } from "react-native-reanimated"

import { categoriesMock } from "@utils/categoriesMock"

import { AppNavigatorRoutesProps } from "../../routes/app.routes"

import { useQuiz } from "@hooks/useQuiz"
import { useSettings } from "@hooks/useSettings"
import { SelectedCategoryProps } from "@context/QuizContext"

import { Loading } from "@components/Loading"
import { HomeHeader } from "@components/HomeHeader"
import { CategoryButton } from "@components/CategoryButton"
import { CategorySectionTitle } from "@components/CategorySectionTitle"

import { CategoryContainer, Container, Title } from "./styles"

const TitleAnimated = Animated.createAnimatedComponent(Title)

export function Home() {

  const { setSelectedTechnology } = useQuiz()
  const { fetchSoundEffectsSettings, isSoundEffectsLoading } = useSettings()

  const { navigate } = useNavigation<AppNavigatorRoutesProps>()

  function handleGoToCategoryMenu({ category, description, options, technology }: SelectedCategoryProps){
    setSelectedTechnology({ category, description, options, technology })

    navigate('categoryQuizMenu')
  }

  useEffect(() => {
    (async () => {
      await fetchSoundEffectsSettings()
    })()
  }, [])

  if (isSoundEffectsLoading){
    return <Loading/>
  }
  
  return (
    <Container>
      <HomeHeader />

      <TitleAnimated entering={FadeInLeft.delay(250)}>
        Qual tecnologia você deseja aprender hoje ?
      </TitleAnimated>

      <FlatList
        data={categoriesMock}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => {

          const category = item.category

          const delay = 500 * (index + 1)

          return (
            <Animated.View entering={FadeInLeft.delay(delay)}>
              <CategoryContainer>
                <CategorySectionTitle category={item.category} />

                <FlatList
                  horizontal
                  data={item.technologies}
                  keyExtractor={(item) => item.id}
                  showsHorizontalScrollIndicator={false}
                  renderItem={({ item }) => (
                    <CategoryButton
                      category={category}
                      technology={item.technology}
                      description={item.description}
                      onPress={() => handleGoToCategoryMenu({ 
                        category, 
                        technology: 
                        item.technology, 
                        options: item.quizOptions,
                        description: item.description, 
                      })}
                    />
                  )}
                />
              </CategoryContainer>
            </Animated.View>

          )
        }}
      />
    </Container>
  )
}