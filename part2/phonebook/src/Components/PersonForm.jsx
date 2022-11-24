const PersonForm = ({onSubmitFunc, onChangeNameFunc, onChangeNumberFunc, valueName, valueNumber}) => {
  return (
    <form onSubmit={onSubmitFunc}>
      <div>
        name: <input value={valueName} onChange={onChangeNameFunc} />
      </div>
      <div>
        number: <input value={valueNumber} onChange={onChangeNumberFunc} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form> 
  )
}

export default PersonForm