import { useState, useEffect } from 'react'
import { useSelector } from "react-redux/es/hooks/useSelector"
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AddCategory from './AddCategory';
import { Button, Select, MenuItem, Card, CardHeader, CardMedia, CardActions } from '@mui/material';
import { deleteRecipe, getRecipes } from '../../service/recipes';
import { getAllCategories } from '../../service/category';
import CreateIcon from '@mui/icons-material/Create';//עריכה
import DeleteIcon from '@mui/icons-material/Delete';//פח
import MenuIcon from '@mui/icons-material/Menu';//תפריט
import Swal from 'sweetalert2'



export default ({ byUser }) => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedDuration, setSelectedDuration] = useState(null);
    const [selectedDifficulty, setSelectedDifficulty] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user, recipes, categories } = useSelector(state => ({
        user: state.user.user,
        recipes: state.recipe.recipes,
        categories: state.category.categories
    }));

    useEffect(() => {
        dispatch(getRecipes(byUser, user));
    }, [])
    useEffect(() => {
        dispatch(getAllCategories());
    }, [])

    const handleCategoryChange = (event) => {
        const selectedCategoryId = event.target.value;
        setSelectedCategory(selectedCategoryId);
    };
    const handleDifficultyChange = (event) => {
        const selectedDifficulty = event.target.value;
        setSelectedDifficulty(selectedDifficulty);
    };
    const handleDurationChange = (event) => {
        const selectedDuration = event.target.value;
        setSelectedDuration(selectedDuration);
    };

    function checkDuration(recipe_duration) {
        switch (selectedDuration) {
            case "60":
                return (recipe_duration >= 60);
            case "45":
                return (recipe_duration >= 45 && recipe_duration < 60);
            case "30":
                return (recipe_duration >= 30 && recipe_duration < 45);
            case "15":
                return (recipe_duration >= 0 && recipe_duration < 30);
            default: return false;
        }
    }
    function deleteRec(user, x) {
        Swal.fire({
            title: "Delete?",
            text: "Are you wann'a remove it?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Deleted!",
                    text: "this recipe has been deleted.",
                    icon: "success"
                });
                dispatch(deleteRecipe(user, x))
            }
        });
    }

    return (<>
        <div className='whiteBack filter'>
            <p>Select Category:</p>
            <Select style={{ width: '20%' }} color="secondary" onChange={handleCategoryChange}
                value={selectedCategory || ''}>
                <MenuItem value={null}>none</MenuItem>
                {categories.map((x) =>
                    <MenuItem key={x.Id} value={x.Id} >{x.Name}</MenuItem>)}
            </Select>

            <p>Select Duration: </p>
            <Select style={{ width: '20%' }} color="secondary" value={selectedDuration || ''} onChange={handleDurationChange}>
                <MenuItem value={null}>none</MenuItem>
                <MenuItem value={15}>15 minutes</MenuItem>
                <MenuItem value={30}>30 minutes</MenuItem>
                <MenuItem value={45}>45 minutes</MenuItem>
                <MenuItem value={60}>an hour and more</MenuItem>
            </Select>

            <p>Select Difficulty: </p>
            <Select style={{ width: '20%' }} color="secondary" placeholder="select duration" onChange={handleDifficultyChange} value={selectedDifficulty || ''}>
                <MenuItem value={null}>none</MenuItem>
                <MenuItem value={1} >קל</MenuItem>
                <MenuItem value={2} >בינוני</MenuItem>
                <MenuItem value={3} >קשה</MenuItem>
                <MenuItem value={4} >קשה מאד</MenuItem>
            </Select></div>

        <div className='whiteBack addButtens'>
            <Button variant="outlined" color="secondary" onClick={() => (navigate('/recipe/add'), { state: null })}>
                Add Recipe
            </Button>
            <AddCategory />
        </div>
        <div className='whiteBack recipesBack'>
            <div className='cards'>
                {recipes?.map(x =>
                    (!selectedCategory || selectedCategory == "none" || x.CategoryId == selectedCategory)
                        && (!selectedDuration || selectedDuration == "none" || checkDuration(x.Duration))
                        && (!selectedDifficulty || selectedDifficulty == "none" || selectedDifficulty == x.Difficulty) ?
                        <Card sx={{ maxWidth: 345 }} key={x?.Id} className='cardOne'>
                            <CardHeader title={x?.Name} subheader={`time: ${x?.Duration}`} />
                            <CardMedia component="img" height="194" image={x?.Img} alt={x?.Name} />
                            <CardActions disableSpacing>
                                <Button variant="outlined" color="secondary" startIcon={<MenuIcon />} onClick={() => { navigate('/recipe/detail', { state: x }) }}>Show</Button>
                                <Button variant="outlined" color="secondary" startIcon={<DeleteIcon />} onClick={() => { deleteRec(user, x) }} disabled={x?.UserId != user?.Id}>delete</Button>
                                <Button variant="outlined" color="secondary" startIcon={<CreateIcon />} onClick={() => (navigate('/recipe/edit', { state: x }))} disabled={x?.UserId != user?.Id}>Edit</Button>
                            </CardActions>
                        </Card>
                        : null)}
            </div>
        </div>
    </>);
}
