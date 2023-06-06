import {useState} from "react";
import styles from "../pages/MainPage/MainPage.module.scss";

export const ULInputs = ({setFormValue, formValue, placeholder})=>{
    const [inputValue, setInputValue] = useState('');
    return(
        <>
            <div>
                {formValue.map((item, index) => (
                    <div key={index}>
                        <input
                            onChange={(e) => {
                                const updatedSkills = [...formValue];
                                updatedSkills[index] = e.target.value;
                                setFormValue(updatedSkills);
                            }}
                            value={item}
                            className={styles.inputLi}
                            type="text"
                            placeholder={placeholder}
                            />
                        <button className={styles.btnDel} onClick={() => {
                            const updatedItem = [...formValue];
                            updatedItem.splice(index, 1);
                            setFormValue(updatedItem);
                        }}>Delete</button>
                    </div>
                ))}
            </div>
            <div>
                <input value={inputValue} onChange={(e) => setInputValue(e.target.value)} className={styles.inputLi} type="text" placeholder={placeholder}/>
                <button className={styles.btnAdd} onClick={() => {
                    const value = inputValue;
                    const item = [...formValue];
                    value === '' ? alert("Введіть текст."): item.push(value);
                    setFormValue(item);
                    setInputValue('');
                }}>Add</button>
            </div>
        </>
    )
}