import { useState, useEffect } from 'react'
import Image from '../../images/img.jpg'
import { Link } from "react-router-dom"
import { useSelector } from "react-redux/es/hooks/useSelector"
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { FormField, Form } from 'semantic-ui-react'
import AddCategory from './AddCategory';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { deleteRecipe, getRecipes } from '../../service/recipes';
import { getAllCategories } from '../../service/category';
import SearchIcon from '@mui/icons-material/Search';

export default ({ byUser }) => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedDuration, setSelectedDuration] = useState(null);
    const [selectedDifficulty, setSelectedDifficulty] = useState(null);
    const { user, recipes, categories } = useSelector(state => ({
        user: state.user.user,
        recipes: state.recipe.recipes,
        categories: state.category.categories
    }));
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { state } = useLocation();

    useEffect(() => {
        console.log("buUser in recipes", byUser, user);
        dispatch(getRecipes(byUser, user));
    }, [])
    useEffect(() => {
        dispatch(getAllCategories());
    }, [])

    const handleCategoryChange = (event) => {
        // הפעולה הזו תתבצע כאשר משתמש בוחר אפשרות בתיבת הבחירה
        const selectedCategoryId = event.target.value;
        setSelectedCategory(selectedCategoryId);
        // ניתן להוסיף פעולות נוספות כאן לפי הצורך
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
    const handleDifficultyChange = (event) => {
        const selectedDifficulty = event.target.value;
        console.log("event.target.value", event.target.value);
        setSelectedDifficulty(selectedDifficulty);
    };

    return (<>

        {/* <img src={Image} style={{ width: 500 }}></img> */}
        {/* <hr /> */}

        <Button variant="outlined" color="secondary" onClick={() => (navigate('/recipe/add'), { state: null })}>
            Add Recipe
        </Button>
        <hr />
        <Select style={{ width: '20%' }} color="secondary" onChange={handleCategoryChange}
            value={selectedCategory || ''}>
            <MenuItem value={null}>none</MenuItem>
            {categories.map((x) =>
                <MenuItem key={x.Id} value={x.Id} >{x.Name}</MenuItem>)}
        </Select>
        <AddCategory />
        <br />
        {/* <p>Selected Category: {selectedCategory}</p> */}
        <Select style={{ width: '20%' }} color="secondary" value={selectedDuration || ''} onChange={handleDurationChange}>
            <MenuItem value={null}>none</MenuItem>
            <MenuItem value={15}>15 minutes</MenuItem>
            <MenuItem value={30}>30 minutes</MenuItem>
            <MenuItem value={45}>45 minutes</MenuItem>
            <MenuItem value={60}>an hour and more</MenuItem>
        </Select>
        <br />
        {/* <p>Selected Duration: {selectedDuration}</p>  */}
        <Select style={{ width: '20%' }} color="secondary" onChange={handleDifficultyChange} value={selectedDifficulty || ''}>
            <MenuItem value={null}>none</MenuItem>
            <MenuItem value={1} >קל</MenuItem>
            <MenuItem value={2} >בינוני</MenuItem>
            <MenuItem value={3} >קשה</MenuItem>
            <MenuItem value={4} >קשה מאד</MenuItem>
        </Select>
        {/* <p>Selected Difficulty: {selectedDifficulty}</p>  */}
        <br />

        {recipes?.map(x =>
            (!selectedCategory || selectedCategory == "none" || x.CategoryId == selectedCategory)
                && (!selectedDuration || selectedDuration == "none" || checkDuration(x.Duration))
                && (!selectedDifficulty || selectedDifficulty == "none" || selectedDifficulty == x.Difficulty) ?
                <div key={x.Id}>
                    <p>{x.Name}</p>
                    <img src={x.Img}></img><br />
                    <Button variant="outlined" color="secondary" onClick={() => { navigate('/recipe/detail', { state: x }) }}>Show</Button>
                    <div>{x.UserId == user.Id ?
                        <div>
                            <Button variant="outlined" color="secondary" onClick={() => { { dispatch(deleteRecipe(user, x)) } }}>delete</Button>
                            <Button variant="outlined" color="secondary" onClick={() => (navigate('/recipe/edit', { state: x }))}>Edit</Button>
                        </div> :
                        <div>
                            <Button variant="outlined" color="secondary" onClick={() => { { dispatch(deleteRecipe(user, x)) } }} disabled={true}>delete</Button>
                            <Button variant="outlined" color="secondary" onClick={() => (navigate('/recipe/edit', { state: x }))} disabled={true}>Edit</Button>
                        </div>
                    }</div>
                </div>
                : null)}

    </>);
}
