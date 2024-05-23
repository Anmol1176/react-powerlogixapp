import { privateAxios } from "./Helper"

//get all nodes
export const loadAllNodes = () => {
    return privateAxios.get('/nodes').then((response) => {
        return response.data
    })
}

//get all nodes
export const loadNode1 = () => {
    return privateAxios.get('/node1').then((response) => {
        return response.data
    })
}

//get all nodes
export const loadNode2 = () => {
    return privateAxios.get('/node2').then((response) => {
        return response.data
    })
}

//get all nodes
export const loadNode3 = () => {
    return privateAxios.get('/node3').then((response) => {
        return response.data
    })
}