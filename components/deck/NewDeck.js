import React, { Component } from 'react'
import { Container, Header, Content, Body, Title, Text, Form, Item, Input, Button, Toast } from 'native-base'
// import { View, Text, TextInput, Alert, StyleSheet, Button } from 'react-native';
import { connect } from 'react-redux'
// import TextButton from '../button/TextButton'
import { NewDeckAction } from '../../actions/DeckActions';
import * as ShortId from 'shortid'
import { saveDeckTitle } from '../../utils/storage'


// const styles = StyleSheet.create({
//     conatiner: {
//         padding: 2,
//         borderRadius: 4,
//         borderWidth: 0.5,
//         borderColor: '#d6d7da',
//         justifyContent: 'center',
//     },
//     title: {
//         fontSize: 19,
//         fontWeight: 'bold',
//       },
//     button: {
//         color: '#841584'
//     },
//     inputStyle: {

//     }
// })

class NewDeck extends Component {
    state = {
        title: ''
    }

    onValueChange(value) {
        this.setState({
          title: value
        });
      }

    onSubmit = () => {
        const { decks } = this.props

        const ifExists = decks && Object.keys(decks).findIndex(k => deck[k].title === this.state.title)
        console.log(ifExists)
        if(!ifExists){

            const deckId = ShortId.generate();
            this.props.dispatch(NewDeckAction({id: deckId, title: this.state.title}))
            saveDeckTitle({id: deckId, title: this.state.title})
            Toast.show({text: 'Deck saved!'})
        } else {
            this.showToast('Deck with this title already exists!')
        }
        
    }

    showToast = (msg) => {
        Toast.show({
            text: msg,
            type: 'danger'
        })
    }

    render(){
        const { title } = this.state
        const { decks } = this.props
        console.log('New Deck render: ', decks)
        return (
            <Container>
                <Header>
                    <Body>
                        <Title>
                            What is the title of your new deck?
                        </Title>
                    </Body>
                </Header>
                <Content padder>
                    <Form>
                        <Item padder>
                            <Input
                                placeholder="Deck Title"
                                onChangeText={this.onValueChange.bind(this)}
                                value={title}
                                />
                        </Item>
                    </Form>
                    <Button disabled={title ? false : true} block style={{ margin: 15, marginTop: 50 }} onPress={() => {this.onSubmit()}}>
                        <Text>Submit</Text>
                    </Button>
                </Content>
            </Container>
        )
    }
}

const mapStateToProps = (store) => {
    return {
        decks: store.decks
    }
}

export default connect(mapStateToProps)(NewDeck)