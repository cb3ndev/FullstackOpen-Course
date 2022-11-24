const SearchFilter = ({onChangefunc}) => {
  return (
    <div>
			filter shown with
			<input onChange={onChangefunc} />
		</div>
  )
}

export default SearchFilter