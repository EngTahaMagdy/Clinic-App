// import * as React from "react";

import { createContext, useContext, useReducer } from "react";
const GlobalContext = createContext(undefined);
const GlobalDispatchContext = createContext(undefined);

const userInfo = JSON.parse(localStorage.getItem("userInfo"));

const initialState = {
	isAuth: localStorage.getItem("isAuth") ?? false,
	token: localStorage.getItem("token") ?? null,
	userInfo: userInfo ?? null,
	allRecords:[]
};
const globalReducer=(state,action)=>{
	switch(action.type){
		case "login":
			localStorage.setItem("isAuth", true);
			localStorage.setItem("token", action.token);			
			localStorage.setItem("userInfo", JSON.stringify(action.userInfo));
			return {
				...state,
				isAuth: action.isAuth,
				token: action.token,
				userInfo: action.userInfo,
				
			};
		case "Allrecords":
			return {
				...state,
				allRecords: action.allRecords
			}	
		case "logout":
			localStorage.removeItem("isAuth");
			localStorage.removeItem("token");
			localStorage.removeItem("userInfo");

			return {
				...state,
				isAuth: false,
				token: null,
				userInfo: null,
			};	
		default: {
			throw new Error(`Unhandled action type: ${action.type}`);
		}
	}
}
function useGlobalState() {
	const context = useContext(GlobalContext);
	if (context === undefined) {
		throw new Error("useGlobalState must be used within a GlobalProvider");
	}
	return context;
}

function useGlobalDispatch() {
	const context = useContext(GlobalDispatchContext);
	if (context === undefined) {
		throw new Error(
			"useGlobalDispatch must be used within a GlobalProvider"
		);
	}
	return context;
}

function GlobalProvider({ children }) {
	const [state, dispatch] = useReducer(globalReducer, initialState);
	return (
		<GlobalContext.Provider value={state}>
			<GlobalDispatchContext.Provider value={dispatch}>
				{children}
			</GlobalDispatchContext.Provider>
		</GlobalContext.Provider>
	);
}

export { GlobalProvider, useGlobalState, useGlobalDispatch };
