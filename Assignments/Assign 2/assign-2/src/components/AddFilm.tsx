import FilmDrawer from "./FilmDrawer";

export default function AddFilm({isOpen, onClose}: any) {
    return (
        <FilmDrawer isOpen={isOpen} onClose={onClose}/>
    )
}