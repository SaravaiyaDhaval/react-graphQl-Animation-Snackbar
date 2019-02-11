import React, {Component} from 'react';
import { Query } from "react-apollo";
import Course from './Course';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Image1 from "./img/guj1.jpg";
import { Link, hashHistory } from 'react-router';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Tooltip from '@material-ui/core/Tooltip';
import CircularProgress from '@material-ui/core/CircularProgress';
import CustomizedSnackbars from './components/Snackbar/CustomizedSnackbars'
import { graphql ,compose } from 'react-apollo';
import gql from 'graphql-tag';
import query from './graphQL/queries/getBooks';
import {DropzoneArea} from 'material-ui-dropzone';

// reavt-animation-packeges
import Roll from 'react-reveal/Roll';
import Zoom from 'react-reveal/Zoom';

class Courses extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAddFieldOpen: false,
            id: '',
            title: '',
            author: '',
            price:'',
            isSnackbarOpen: false,
            snackbarMsg: "",
            isValidTitle:true,
            isValidAuthorName:true,
            isValidPrice:true,
            snackbarType:"success",
            AddEffect: false
        };
        // this.handlAdd =this.handlAdd.bind(this);
    }
    AddFieldOpen = () =>{
        this.setState({
            isAddFieldOpen: true
        })
    }
    handleCancle = () =>{

        this.setState({
            isAddFieldOpen: false
        })

    }
    handleChange = prop => event => {
        if(prop == 'title') {

                this.setState({
                    title: event.target.value
                })
            if(this.state.title === ""){
                this.setState({
                    isValidTitle: false,
                })
            }
            else{
                this.setState({
                    isValidTitle: true,
                })
            }

        }
        if(prop == 'author') {
            this.setState({
                author: event.target.value
            })
            if(this.state.author === ""){
                this.setState({
                    isValidAuthorName: false,
                })
            }
            else{
                this.setState({
                    isValidAuthorName: true,
                })
            }
        }

        if(prop == 'price') {
            this.setState({
                price: event.target.value
            })
            if(this.state.author === ""){
                this.setState({
                    isValidPrice: false,
                })
            }
            else{
                this.setState({
                    isValidPrice: true,
                })
            }
        }

    };
    handlAdd = () => {
        debugger;
        const {title ,author, price} = this.state;

            if(title !== '' && author !== '' && price !== '') {
            this.setState({
                         isSnackbarOpen:true,
                         snackbarType:"success",
                            isValidTitle: true,
                            isValidAuthorName:true,
                            isValidPrice: true,
                            AddEffect: true,
                         snackbarMsg: "Data Inserted Successfull"},
                () => {setTimeout(()=> {
                         this.setState(()=> ( {
                                 isSnackbarOpen: false,
                                 snackbarMsg: "",}
                                 ))
                }, 5000);
            })
            this.props.setAddMutate({
                variables: {
                    title: this.state.title,
                    author: this.state.author,
                    price: this.state.price
                },
                refetchQueries: [{query: query}]
            })
            this.setState({
                isAddFieldOpen: false,
                title: '',
                author: '',
                price: '',
            })
        }
        else {
                if(!title){
                    this.setState({
                        isValidTitle: false
                    })
                }
                if(!author){
                    this.setState({
                        isValidAuthorName: false
                    })
                }
                if(!price){
                    this.setState({
                        isValidPrice: false
                    })
                }
                this.setState({
                        isSnackbarOpen:true,
                        snackbarType:"error",
                        snackbarMsg: "Please Enter Valid Data. "},
                    () => {setTimeout(()=> {
                        this.setState(()=> ( {
                                isSnackbarOpen: false,
                                snackbarMsg: "",}
                        ))
                    }, 5000);
                    })
            }
    }
    handleAggreeToDelete = (book) => {
        this.setState({
            isSnackbarOpen:true,
            snackbarType:"success",
            snackbarMsg: "Data Deleted Successfull",
        },() => {
            setTimeout(()=> {
                this.setState(()=> ({ isSnackbarOpen: false , snackbarMsg: "",}))
            }, 5000); })

        this.props.setRemoveMutate({
            variables: {
                id: book.bookId,
            },
            refetchQueries: [{ query: query }]
        })

    }
    handleSnackbarClose =() =>{
        this.setState({
            isSnackbarOpen:false
        })
    }
    handleEditData = (book) => {

        if(book.author !== '' && book.title !== '' && book.price !== '') {
            debugger;
            this.setState({
                isSnackbarOpen: true,
                snackbarType: "success",
                snackbarMsg: "Data Updated Successfull"
            }, () => {
                setTimeout(() => {
                    this.setState(() => ({isSnackbarOpen: false, snackbarMsg: "",}))
                }, 5000);
            })

            this.props.setEditMutate({
                variables: {
                    id: book.id,
                    title: book.title,
                    author: book.author,
                    price: book.price
                },
                refetchQueries: [{query: query}]
            })
        }
        else{
            this.setState({
                    isSnackbarOpen:true,
                    snackbarType:"error",
                    snackbarMsg: "Please Enter Valid Data. "},
                () => {setTimeout(()=> {
                    this.setState(()=> ( {
                            isSnackbarOpen: false,
                            snackbarMsg: "",}
                    ))
                }, 5000);
                })
        }

    }
    handleImageChange = (files) => {
        this.setState({
          files: files
        });
      }
    render() {

        const img = {
            margin: 'auto',
            display: 'block',
            maxWidth: '100%',
            maxHeight: '100%',
        }
        const root = {
            flexGrow: 1,
        }
        const paper = {

            margin: 'auto',
            maxWidth: 500,
        }
        const image = {
            width: 175,
            height: 128,
        }
        const imgGrid = {
            display: 'flex',
            margin: 'auto',
        }
            return (
                <Query
                    query={gql`
                  {
                   books {
                        id
                        title
                        author
                        price
                      }
                  }
                `}
                >

                    {({loading, error, data}) => {
                        if (loading) return <p style={{textAlign:'center'}}><CircularProgress/></p>;
                        if (error) return <p>Error :(</p>;

                        return (
                            <Grid container spacing={24}>
                                {data.books.map((currentCourse) => (
                                        <Grid item md={6} xs={12} >
                                            {this.state.AddEffect ?
                                                <Zoom bottom>
                                                    <div>
                                                        <Course course={currentCourse}
                                                                handleAggreeToDelete={this.handleAggreeToDelete}
                                                                handleEditData={this.handleEditData}/>
                                                    </div>
                                                </Zoom>
                                                :
                                                <Roll left opposite>
                                                    <div>
                                                        <Course course={currentCourse}
                                                                handleAggreeToDelete={this.handleAggreeToDelete}
                                                                handleEditData={this.handleEditData}/>
                                                    </div>
                                                </Roll>
                                            }
                                        </Grid>
                                ))}
                                {this.state.isAddFieldOpen &&
                                    <Grid item md={6} xs={12}>
                                        <Paper className={paper}>
                                            <Grid container spacing={16}>
                                                <Grid item md={4} style={imgGrid}>
                                                    <DropzoneArea  onChange={this.handleImageChange}
                                                        acceptedFiles={['image/*',]}
                                                        filesLimit={5}
                                                        maxFileSize={3000000}
                                                        dropzoneText='Drag your book images'	
                                                        />
                                                </Grid>
                                                <Grid item xs={12} md={8} sm container>
                                                    <Grid item xs container direction="column" spacing={16}>
                                                        <Grid item xs>

                                                            <Typography gutterBottom variant="subtitle1">
                                                                <TextField
                                                                        error={this.state.isValidTitle ? false : true}
                                                                        id="outlined-dense"
                                                                        label="Book Title"
                                                                        margin="dense"
                                                                        variant="outlined"
                                                                        value={this.state.title}
                                                                        style={{width:"100%"}}
                                                                        onChange={this.handleChange('title')}

                                                                    />
                                                            </Typography>
                                                            <Typography gutterBottom>
                                                                    <TextField
                                                                        error={this.state.isValidAuthorName ? false : true}
                                                                        id="outlined-dense"
                                                                        label="Author Name"
                                                                        margin="dense"
                                                                        value={this.state.author}
                                                                        variant="outlined"
                                                                        style={{width:"100%"}}
                                                                        onChange={this.handleChange('author')}
                                                                    />
                                                            </Typography>
                                                            <Typography gutterBottom>
                                                                <Typography color="textSecondary">
                                                                        <TextField
                                                                            error={this.state.isValidPrice ? false : true}
                                                                            id="outlined-adornment-weight"
                                                                            variant="outlined"
                                                                            label="Book Price"
                                                                            value={this.state.price}
                                                                            type="number"
                                                                            InputProps={{
                                                                                endAdornment: <InputAdornment position="end">Rs</InputAdornment>,
                                                                            }}
                                                                            style={{width:"100%"}}
                                                                            onChange={this.handleChange('price')}
                                                                        />
                                                                </Typography>
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item container>
                                                            <Grid item md={3}>
                                                                <Tooltip title="Add" aria-label="Add">
                                                                    <Button variant="outlined" color="primary" onClick={this.handlAdd}>
                                                                       Add
                                                                    </Button>
                                                                </Tooltip>
                                                            </Grid>
                                                            <Grid item md={3}>
                                                                <Tooltip title="Cancle" aria-label="Cancle">
                                                                    <Button variant="outlined" color="secondary" onClick={this.handleCancle}>
                                                                       Cancle
                                                                    </Button>
                                                                </Tooltip>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Paper>
                                    </Grid>
                                }

                                    <Grid item md={6} xs={12} >
                                        <Tooltip title="Add New Book" aria-label="Add New Book">
                                            <Fab color="secondary" aria-label="Add" onClick={this.AddFieldOpen}>
                                                <AddIcon />
                                            </Fab>
                                        </Tooltip>
                                    </Grid>

                                <CustomizedSnackbars
                                    isSnackbarOpen={ this.state.isSnackbarOpen}
                                    snackbarMsg={this.state.snackbarMsg}
                                    handleSnackbarClose={this.handleSnackbarClose}
                                    verticalAlign= "bottom"
                                    horizontalAlign="left"
                                    snackbarType={this.state.snackbarType}
                                    isIconButtonCloseDisplay={true}
                                />

                            </Grid>
                        )
                    }}
                </Query>
            )
    }
}

const Addmutation = gql`
mutation AddBooks($title: String!, $author: String!, $price: String! ){
    addBooks(title: $title, author: $author, price: $price){
        id
      title
      author
      price
    }
  }

`;

const Removemutation = gql`
mutation RemoveBooks($id: Int ){
    removeBooks(id: $id){
        id
    }
  }
`;

const Editmutation = gql`
mutation EditBooks($id: Int, $title: String!, $author: String!, $price: String! ){
    editBooks(id: $id, title: $title, author: $author, price: $price){
      id
      title
      author
      price
    }
  }
`;


export default compose(
    graphql(query, {
        options: { pollInterval: 5000 },
    }),
    graphql(Addmutation, { name: 'setAddMutate' }),
    graphql(Editmutation, { name: 'setEditMutate' }),
    graphql(Removemutation, { name: 'setRemoveMutate' }),
)(Courses);
