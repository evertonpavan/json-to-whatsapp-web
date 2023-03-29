import { useContext } from "react";
import StepContext from "../contexts/step/StepContext";
   
export const useStep = () => useContext(StepContext);