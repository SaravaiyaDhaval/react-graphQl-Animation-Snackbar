import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Button from "@material-ui/core/Button";
import Fab from '@material-ui/core/Fab';
import Image1 from './img/guj1.jpg';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Popper from '@material-ui/core/Popper';
import Fade from '@material-ui/core/Fade';
import Tooltip from '@material-ui/core/Tooltip';
import {DropzoneArea} from 'material-ui-dropzone';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

class Course extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: null,
            title: '',
            author: '',
            price:'',
            isEdit: false,
            anchorEl: null,
            isConfirmOpen: false,
            isValidTitle:true,
            isValidAuthorName:true,
            isValidPrice:true,
            files: [],

        };
        this.handleEdit = this.handleEdit.bind(this);
    }

    componentDidMount() {
        var id = Number(this.props.course && this.props.course.id);
        this.setState({
                id : id,
                title: this.props.course && this.props.course.title,
                author: this.props.course && this.props.course.author,
                price: this.props.course && this.props.course.price
            })
    }

    componentWillReceiveProps() {
        var id = Number(this.props.course && this.props.course.id);
        this.setState({
            id : id,
            title: this.props.course && this.props.course.title,
            author: this.props.course && this.props.course.author,
            price: this.props.course && this.props.course.price
        })
    }


    handleConfirm = event => {
        const { currentTarget } = event;
        this.setState(state => ({
            anchorEl: currentTarget,
            isConfirmOpen: !state.isConfirmOpen,
        }));
    };
    handalDisAggree = () =>{
        this.setState({
            isConfirmOpen: false,
        });
    }

    handalAggree = () => {
        debugger
        const id =this.state.id;
        this.setState({
            isConfirmOpen: false,
        });
         this.props.handleAggreeToDelete({bookId: id})



        // this.props.mutate({
        //     variables: {
        //         id: this.state.id,
        //     },
        //     refetchQueries: [{ query: query }]
        // })

    }

    handleEdit = () =>{
            debugger;
        const {title , author ,price} = this.state;
        this.props.handleEditData({id :this.state.id, title: this.state.title , author: this.state.author, price: this.state.price})

        if(title !== '' &&  author !=='' && price !=='') {
            this.setState({
                isEdit: false
            })
        }
        else {
            this.setState({
                isEdit: true
            })

        }
    }
    handleEditCancle = () => {
        this.setState({
            isEdit: false
        })
    }

    handleEditField = () =>{
        this.setState({
            isEdit: true
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

     handleImageChange = (files) => {
        this.setState({
          files: files
        });
      }
        onSortItems = (items) => {
    this.setState({
      items: items
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
        const typography =  {
            padding: "15px"
        }
        const { classes } = this.props;
        const { anchorEl, isConfirmOpen } = this.state;
        const id = isConfirmOpen ? 'simple-popper' : null;

        return (
            <div className={root} style={{'width': '100%', 'marginTop': '10px'}}>
                <Paper className={paper}>
                    <Grid container spacing={16}>
                        <Grid item md={4} style={imgGrid}>
                        {this.state.isEdit?
                            <DropzoneArea  onChange={this.handleImageChange}
                                           acceptedFiles={['image/*',]}
                                           filesLimit={5}
                                           maxFileSize={3000000}
                                           dropzoneText='Drag your book images'	
                                        />
                            :
                            <ButtonBase style={image}> 
                             <Carousel width={170}  infiniteLoop={true} swipeable={true} interval={5000} transitionTime={200} autoPlay={true} centerSlidePercentage={30} showThumbs={false}> 
                                <div>
                                    <img src={Image1} />
                                </div>
                                <div>
                                    <img src={Image1}/>
                                </div>
                                <div>
                                    <img src={Image1}/>
                                </div>
                            </Carousel>
                                {/* <img alt="complex" style={img} src={Image1}/> */}
                            </ButtonBase>
                        }
                        </Grid>
                        <Grid item xs={12} md={8} sm container>
                            <Grid item xs container direction="column" spacing={16}>
                                <Grid item xs>

                                    <Typography gutterBottom variant="subtitle1">
                                        {this.state.isEdit?

                                            <TextField
                                                error={this.state.isValidTitle ? false : true}
                                                id="outlined-dense"
                                                label="Book Title"
                                                margin="dense"
                                                variant="outlined"
                                                value={this.state.title}
                                                style={{width:"100%"}}
                                                onChange={this.handleChange('title')}

                                            /> :
                                        <h5>{this.state.title}</h5>}


                                    </Typography>
                                    <Typography gutterBottom>
                                        {this.state.isEdit ?

                                            <TextField
                                                error={this.state.isValidAuthorName ? false : true}
                                                id="outlined-dense"
                                                label="Author Name"
                                                margin="dense"
                                                value={this.state.author}
                                                variant="outlined"
                                                style={{width:"100%"}}
                                                onChange={this.handleChange('author')}
                                            /> :
                                            <p> By {this.state.author}</p>
                                        }
                                     </Typography>
                                    <Typography gutterBottom>
                                        <Typography color="textSecondary">
                                        {this.state.isEdit ?
                                            <TextField
                                                error={this.state.isValidPrice ? false : true}
                                                id="outlined-adornment-weight"
                                                variant="outlined"
                                                label="Book Price"
                                                value={this.state.price}
                                                InputProps={{
                                                    endAdornment: <InputAdornment position="end">Rs</InputAdornment>,
                                                }}
                                                style={{width:"100%"}}
                                                onChange={this.handleChange('price')}
                                            />
                                            :
                                            <p> ID: {this.state.id}</p>
                                        }
                                    </Typography>
                                    </Typography>
                                </Grid>
                                <Grid item container>
                                    <Grid item md={3}>
                                        <Tooltip title={this.state.isEdit ? "Save Now ?" :"Edit Now ?" } aria-label={this.state.isEdit ? "Save Now ?" :"Edit Now ?" }>
                                            <Button variant="outlined" color="primary"  onClick={this.state.isEdit ? this.handleEdit : this.handleEditField}>
                                                {this.state.isEdit ? "Save" :"Edit" }
                                            </Button>
                                        </Tooltip>
                                    </Grid>
                                    <Grid item md={3}>
                                        <Tooltip title= {this.state.isEdit ? "Cancle Now ?" :"Remove Now ?" } aria-label= {this.state.isEdit ? "Cancle Now ?" :"Remove Now ?" }>
                                            <Button variant="outlined" color="secondary" onClick={this.state.isEdit ? this.handleEditCancle : this.handleConfirm}>
                                                {this.state.isEdit ? "Cancle" :"Remove" }
                                            </Button>
                                        </Tooltip>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Popper id={id} open={isConfirmOpen} anchorEl={anchorEl} transition>
                                {({ TransitionProps }) => (
                                    <Fade {...TransitionProps} timeout={350}>
                                            <Typography style={typography}>

                                                <Paper className={paper}>
                                                    <DialogTitle>{"Are You sure to remove it ?"}</DialogTitle>
                                                    <DialogActions>
                                                        <Tooltip title="Disagree For Delete Now ?" aria-label="Disagree For Delete Now ?">
                                                            <Button  color="primary" onClick={this.handalDisAggree}>
                                                                Disagree
                                                            </Button>
                                                        </Tooltip>
                                                        <Tooltip title="Agree For Delete Now ?" aria-label="Agree For Delete Now ?">
                                                            <Button  color="primary" onClick={this.handalAggree}>
                                                                Agree
                                                            </Button>
                                                        </Tooltip>
                                                    </DialogActions>
                                                </Paper>
                                            </Typography>
                                    </Fade>
                                )}
                            </Popper>

                            {!this.state.isEdit &&
                            <Grid item>
                                <Fab color="primary" aria-label="Add">
                                    {this.state.price} Rs
                                </Fab>
                            </Grid>
                            }
                        </Grid>
                    </Grid>
                </Paper>
            </div>
        );
    }
}
// const mutation = gql`
// mutation RemoveBooks($id: Int ){
//     removeBooks(id: $id){
//         id
//     }
//   }
// `

export default Course;
//
// export default graphql(mutation) (Course);
