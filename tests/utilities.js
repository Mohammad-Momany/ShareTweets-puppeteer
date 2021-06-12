module.exports = {
    selectByName(type) {
        return `input[name="session[${type}]"]`
    },
    selectByTestid(id) {
        return `div[data-testid="${id}"]`
    },
};