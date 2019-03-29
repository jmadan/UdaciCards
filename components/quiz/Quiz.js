import React, { Component } from 'react'
import { Animated, StyleSheet } from 'react-native'
import { Container, Text, Header, Content, Button, Card, CardItem, Body, Row } from 'native-base';
import { connect } from 'react-redux'


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    flipCard: {
        width: 300,
        height: 250,
        alignItems: 'center',
        justifyContent: 'center',
        backfaceVisibility: 'hidden',
    },
    flipCardBack: {
        position: 'absolute',
        top: 0,
        backgroundColor: '#DCDCDC'
    },
    flipText: {
        fontSize: 20,
        fontWeight: 'bold',
        alignSelf: 'center',
        margin: 15
      },
    btn: {
        margin: 10,
        justifyContent: 'center'
    },
    result: {
        fontWeight: 'bold',
        fontSize: 24,
        color: 'green',
        margin: 15
    }
  });

class Quiz extends Component {

    state = {
        deck: null,
        correctQuestionsAnswered: 0,
        incorrectQuestionsAnswered: 0,
        numberOfCards: 0,
        currentCard: null,
        quizComplete: false,
        currentIndex: 0,
        cardKeys: null
    }

    componentWillMount(){
        this.animatedValue = new Animated.Value(0);
        this.value = 0;
        this.animatedValue.addListener(({ value }) => {
            this.value = value;
        })
        this.frontInterpolate = this.animatedValue.interpolate({
            inputRange: [0, 180],
            outputRange: ['0deg', '180deg'],
        })
        this.backInterpolate = this.animatedValue.interpolate({
            inputRange: [0, 180],
            outputRange: ['180deg', '360deg']
        })
    }

    flipCard() {
        if (this.value >= 90) {
          Animated.spring(this.animatedValue,{
            toValue: 0,
            friction: 8,
            tension: 10
          }).start();
        } else {
          Animated.spring(this.animatedValue,{
            toValue: 180,
            friction: 8,
            tension: 10
          }).start();
        }
    }

    componentDidMount() {
        const { decks, navigation } = this.props
        const deckTitle = navigation.getParam('deckTitle', 'NO-ID')
        const deck = decks[deckTitle]
        this.updateState('deck', deck)
        const cardKeys = Object.keys(deck.questions)
        this.updateState('cardKeys', cardKeys)
        this.updateState('numberOfCards', cardKeys.length)
        if(cardKeys.length){
            this.updateState('currentIndex', 0)
            this.updateState('currentCard', deck.questions[cardKeys[0]])
        }
    }

    updateState(key, value){
        this.setState({
            [key]: value
        })
    }

    handleIndex(currentIndex, numberOfCards, deck, cardKeys){
        if(currentIndex >= numberOfCards-1) {
            this.setState({
                quizComplete: true,
            })
        } else {
            this.setState({
                currentCard: deck.questions[cardKeys[currentIndex + 1]]
            })
        }
    }

    correctAnswer(){
        const {
            currentIndex,
            numberOfCards,
            quizComplete,
            deck,
            cardKeys,
            correctQuestionsAnswered
        } = this.state

        if(currentIndex <= numberOfCards-1){
            this.setState({
                correctQuestionsAnswered: correctQuestionsAnswered + 1,
                currentIndex: currentIndex + 1,
            })
        }

        this.handleIndex(currentIndex, numberOfCards, deck, cardKeys)
    }

    incorrectAnswer(){
        const {
            currentIndex,
            numberOfCards,
            quizComplete,
            deck,
            cardKeys,
            incorrectQuestionsAnswered
        } = this.state

        if(currentIndex <= numberOfCards-1){
            this.setState({
                incorrectQuestionsAnswered: incorrectQuestionsAnswered + 1,
                currentIndex: currentIndex + 1,
            })
        }

        this.handleIndex(currentIndex, numberOfCards, deck, cardKeys)

    }

    render(){
        const { cardKeys, currentCard, deck, quizComplete, correctQuestionsAnswered, numberOfCards, currentIndex } = this.state
        // const ele = currentCard ? 
        //         <Text>{currentCard.question}</Text>
        //      : <Content>
        //         <Text>You scored: {parseInt((correctQuestionsAnswered/numberOfCards) * 100)}% </Text>
        //     </Content>

        const frontAnimatedStyle = {
            transform: [
              { rotateY: this.frontInterpolate}
            ]
        }
        const backAnimatedStyle = {
            transform: [
                { rotateY: this.backInterpolate }
            ]
        }

        return(
            <Container style={styles.container}>
                <Header transparent style={{width: 300, alignSelf: 'flex-start'}}>
                    <Body>
                        <Text>{quizComplete ? 'Quiz Complete' : `${currentIndex + 1} / ${numberOfCards}`}</Text>
                    </Body>
                </Header>
                {!quizComplete ? 
                    <Content style={{alignSelf: 'center'}}>
                    <Animated.View style={[styles.flipCard, frontAnimatedStyle]}>
                    <Container style={styles.container}>
                        <Content>
                            <Text style={styles.flipText}>{currentCard ? currentCard.question : ''} {'\n'}</Text>
                            <Button success style={styles.btn} onPress={()=>{this.flipCard()}}><Text>Answer</Text></Button>
                        </Content>
                        </Container>    
                    </Animated.View>
                    <Animated.View style={[styles.flipCard, styles.flipCardBack, backAnimatedStyle]}>
                        <Content>
                            <Text style={styles.flipText}>{currentCard ? currentCard.answer : ''}{'\n'}</Text>
                            <Button success style={styles.btn} onPress={()=>{this.flipCard()}}><Text>Question</Text></Button>
                        </Content>
                    </Animated.View>
                    <Content style={{width: 250, alignSelf: 'center'}}>
                        <Button
                            block
                            success
                            onPress={()=> this.correctAnswer()}
                            style={styles.btn}
                        >
                            <Text> Correct </Text>
                        </Button>
                    
                        <Button
                            block
                            danger
                            onPress={()=>{this.incorrectAnswer()}}
                            style={styles.btn}
                        >
                            <Text> Incorrect </Text>
                        </Button>
                    </Content>
                </Content> : 
                <Content>
                    <Text style={styles.result}>You scored: {parseInt((correctQuestionsAnswered/numberOfCards) * 100)}% </Text>
                </Content>
            }
                
            </Container>
        )
    }

}

const mapStateToProps = (store) => {
    return {
        decks: store.decks
    }
}

export default connect(mapStateToProps)(Quiz);