export default function validateAddPiece(values) {
    let errors = {};
    if (!values.pieceName) {
        errors.pieceName = 'Le nom de la pièce est obligatoire';
    }
    if (!values.piecePrice) {
        errors.piecePrice = 'Le prix de la pièce est obligatoire';
    }
    return errors;
};

