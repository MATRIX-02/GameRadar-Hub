/* eslint-disable no-unused-vars */
// BASE URL
const base_url = `https://api.rawg.io/api/`;
const api_key = import.meta.env.VITE_RAWG_KEY;

//Getting the month
const getCurrentMonth = () => {
    const month  = new Date().getMonth() + 1;
    if(month < 10){
        return `0${month}`
    } else{
        return month;
    }
};

//Getting the date
const getCurrentDay = () => {
    const day  = new Date().getDate() ;
    if(day < 10){
        return `0${day}`
    } else{
        return day;
    }
};

//Current day/month/year
const currentYear = new Date().getFullYear();
const currentMonth = getCurrentMonth();
const currentDay = getCurrentDay();
const currentDate = `${currentYear}-${currentMonth}-${currentDay}`;
const lastYear = `${currentYear - 1}-${currentMonth}-${currentDay}`;
const nextYear = `${currentYear + 1}-${currentMonth}-${currentDay}`;

const popular_games = `games?key=${api_key}&dates=${lastYear},${currentDate}&ordering=-rating&page_size=10`;
const upcoming_games = `games?key=${api_key}&dates=${currentDate},${nextYear}&ordering=-added&page_size=10`;
const newGames = `games?key=${api_key}&dates=${lastYear},${currentDate}&ordering=-released&page_size=10`;

export const popularGamesURL = () => `${base_url}${popular_games}`;
export const upcomingGamesURL = () => `${base_url}${upcoming_games}`;
export const newGamesURL = () => `${base_url}${newGames}`;

// GAME DETAILS
export const gameDetailsURL = (game_id) => `${base_url}games/${game_id}?key=${api_key}`;

// game screenshots
export const gameScreenshotsURL = (game_id) => {
    return `${base_url}games/${game_id}/screenshots?key=${api_key}`;
};

// Searched game
export const searchedGameURL = (game_name) => {
    return `${base_url}games?search=${game_name}&key=${api_key}&page_size=9`
};