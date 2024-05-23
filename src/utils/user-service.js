import { myAxios, privateAxios } from "./Helper";

//user details
export const signUp = (user) => {
    return myAxios.post('/user/register',user).then((response) => response.data);
};

export const loginUser = (loginDetail) => {
    console.log(loginDetail)
    return myAxios.post(`/auth/login`,loginDetail).then((response)=>response.data)
}

//get all users
export const loadAllUsers = () => {
    return myAxios.get('/public/users').then((response) => {
        return response.data
    })
}

//get all user of particular organisation 
export const loadUsersByOrganisation = (orgId) => {
    return privateAxios.get(`/org/${orgId}/users`).then((resp) => resp.data);
}

//create operator
export const createOperator = (operatorData) => {
    return privateAxios.post(`/org/${operatorData.orgId}/users`,operatorData).then((response) => response.data);
}

//get all Operators
export const loadAllOperators = () => {
    return privateAxios.get('/users').then((response) => {
        return response.data
    })
}

//get single operator
export const loadSingleOperators = (orgId,userId) => {
    return privateAxios.get(`/org/${orgId}/user/${userId}`).then((response) => response.data);
}

//update location
export const doUpdateOperators = (operator,orgId, userId) => {
    return privateAxios.put(`/org/${orgId}/user/${userId}/users`, operator).then((resp) => resp.data);
}

//get allorganisations with count
export const countOrganisation = () =>{
    return privateAxios.get('/organisations/count').then((response) => {
        return response.data
    })
}

//get all organisation
export const loadAllOrganisation = () => {
    return privateAxios.get('/organisations').then((response) => {
        return response.data
    })
}

//create organisation
export const createOrg = (orgData) => {
    return privateAxios.post('/organisations',orgData).then((response) => response.data);
}

//get single organisation
export const loadOrganisation = (orgId) => {
    return privateAxios.get(`/organisations/${orgId}`).then((response) => response.data);
}

//update organisation
export const doUpdateOrg = (org, orgId) => {
    return privateAxios.put(`/organisations/${orgId}`, org).then((resp) => resp.data);
}

//get all locations
export const loadAllLocation = () => {
    return privateAxios.get('/locations').then((response) => {
        return response.data
    })
}

//get all location of particular organisation 
export const loadLocationsByOrganisation = (orgId) => {
    return privateAxios.get(`/org/${orgId}/locations`).then((resp) => resp.data);
}

//create location
export const saveLocation = (locationData) => {
    return privateAxios.post(`/org/${locationData.orgId}/locations`,locationData).then((response) => response.data);
}

//get single location
export const loadLocation = (orgId,locationId) => {
    return privateAxios.get(`/org/${orgId}/location/${locationId}`).then((response) => response.data);
}


//update location
export const doUpdateLocation = (location,orgId, locationId) => {
    return privateAxios.put(`/org/${orgId}/location/${locationId}`, location).then((resp) => resp.data);
}

//create gateway
export const saveGateway = (data) => {
    return privateAxios.post(`/org/${data.orgId}/location/${data.id}/gateways`,data).then((response) => response.data);
}

//create gateway
export const doSaveGateway = (GatewayData) => {
    return privateAxios.post(`/org/${GatewayData.orgId}/location/${GatewayData.locationId}/gateways`,GatewayData).then((response) => response.data);
}

//load particular gateway
export const loadGatewayByOrganisationAndLocation = (orgId,locationId) => {
    return privateAxios.get(`/org/${orgId}/location/${locationId}/gateways`).then((response) => response.data);
}

//get single gateway
export const loadGateway = (orgId,locationId,gatewayId) => {
    return privateAxios.get(`/org/${orgId}/location/${locationId}/gateways/${gatewayId}`).then((response) => response.data);
}

export const doUpdateGateway = (location,orgId, locationId,gatewayId) => {
    return privateAxios.put(`/org/${orgId}/location/${locationId}/gateways/${gatewayId}`, location).then((resp) => resp.data);
}

//get emsLog by gateway
export const loadEMSTableByGateway = (gatewayId) => {

    return privateAxios.get(`/gateway/${gatewayId}/emslogs`).then((response) => response.data);
}

//get all nodes
export const loadAllGateway = () => {
    return privateAxios.get('/gateway').then((response) => {
        return response.data
    })
}

//get all locations
export const loadAllNotification = () => {
    return privateAxios.get('/notification').then((response) => {
        return response.data
    })
}

