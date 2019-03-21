import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FetchDecks } from '../../utils/storage'
import { FetchDecksAction } from '../../actions/DeckActions'
import { Container, Header, Content, Text, Card, CardItem } from 'native-base';
import { FlatList } from 'react-native'

class Deck extends Component {
    state = {
        deckList: null
    }

    componentDidMount(){
        this.props.dispatch(FetchDecksAction())
    }

    componentDidUpdate(prevProps) {
        const { decks } = this.props;
        if(decks && decks !== prevProps.decks)
        {
            this.updateState(decks.decks)
        };
    }

    updateState(decks){
        this.setState({
            deckList: decks
        })
    }

    render(){
        const { deckList } = this.state;

        if(deckList){
            return (
                <Container>
                    <FlatList data={deckList} keyExtractor={item => item.id} renderItem={({item}) => 
                         <Card>
                             <CardItem>
                                 <Text>{item.title}</Text>
                             </CardItem>
                         </Card>}
                     />
                </Container>
            )
        } else {
            return (
                <Container>    
                    <Content>
                            <Text>
                                No Decks Found...
                            </Text>
                    </Content>
                </Container>
            )
        }
    }
}

function mapStateToProps(store){
    return {
        decks: store.decks
    }
}

export default connect(mapStateToProps)(Deck)