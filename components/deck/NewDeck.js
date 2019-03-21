import React, { Component } from 'react'
import { Container, Header, Content, Body, Title, Text, Form, Item, Input, Button, Toast } from 'native-base'
// import { View, Text, TextInput, Alert, StyleSheet, Button } from 'react-native';
import { connect } from 'react-redux'
// import TextButton from '../button/TextButton'
import { NewDeck } from '../../actions/DeckActions';
import * as ShortId from 'shortid'
import { CreateDeck } from '../../utils/storage'


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

class AddDeck extends Component {
    state = {
        title: ''
    }

    onValueChange(value) {
        console.log(value)
        this.setState({
          title: value
        });
      }

    onSubmit = () => {
        const { deckList } = this.props
        const ifExists = deckList.decks && deckList.decks.find(d => d.title === this.state.title)
        if(!ifExists){
            console.log('I am in')
            const deckId = ShortId.generate();
            this.props.dispatch(NewDeck({id: deckId, title: this.state.title}))
            CreateDeck({id: deckId, title: this.state.title})
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
        return (
            <Container>
                <Header>
                    <Body>
                        <Title>
                            Create a New Deck
                        </Title>
                    </Body>
                </Header>
                <Content padder>
                    <Form>
                        <Item padder>
                            <Input
                                placeholder="Deck title"
                                onChangeText={this.onValueChange.bind(this)}
                                value={title}
                                />
                        </Item>
                    </Form>
                    <Button disabled={title ? true : false} block style={{ margin: 15, marginTop: 50 }} onPress={() => {this.onSubmit()}}>
                        <Text>Submit</Text>
                    </Button>
                </Content>
            </Container>
        )
    }
}

const mapStateToProps = (store) => {
    return {
        deckList: store.decks
    }
}

export default connect(mapStateToProps)(AddDeck)