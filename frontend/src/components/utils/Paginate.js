// utils/Paginate.js

export default function paginate(length, list, currentPage) {
    const TOURS_PER_PAGE = 6;
    const pages = Math.ceil(length / TOURS_PER_PAGE);
    const startIndex = (currentPage - 1) * TOURS_PER_PAGE;
    const finishIndex = currentPage * TOURS_PER_PAGE;

    const orderedTourList = list.slice(startIndex, finishIndex);

    return {
        pages,
        orderedTourList
    };
}
