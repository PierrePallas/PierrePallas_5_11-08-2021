// Récupération ID
const getProductId = () => {
    const params = (new URL(document.location)).searchParams;
    return params.get('id')

}
console.log(getProductId ())
