const formatDate = (date) => {
    return new Intl.DateTimeFormat("pt-BR", {
        timeStyle: "short",
    }).format(date);
}
