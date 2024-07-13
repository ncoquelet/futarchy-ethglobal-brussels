# Futarchy ETHGlobal Brussels

## Contract Specs

- FutarchyGovernance
  |
  - FutarchyGoal
    |
    - FutarchyProposal
      | |
      | - FutarchyMarket
      |
    - FutarchyOracle

### FutarchyGovernance

Contrat principal qui représente une instance de gouvernance (pourune entreprise, une municipalité, ...).

- Functions : createGoal, listGoals, getGoal

### FutarchyGoal

Contrat représentant un objectif commun, défini et voter à la majorité par l'ensemble des votants de l'instance.

- Attributes : description, goal, tokenomics, proposalExpiration, goalMaturity
- Functions : createProposal, listProposals, getProposal

### FutarchyProposal

Contrat représentant une proposition soumise au marché.

- Attributes : description, tokenomics, expiration, marketYes, marketNo
- Functions : getMarketYes, getMarketNo

### FutarchyProposalToken

Contrat représentant une instance erc20 du token de la proposal (un token unique ? ou une token yes + un token no ??)

- Attributes : description, tokenomics, expiration, marketYes, marketNo
- Functions : getMarketYes, getMarketNo

### FutarchyMarket

Contrat représentant le marché pour une option d'une proposition.

- Atributes : tokenProposal, tokenCollateral, canceled
- Functions : buy, sell, withdraw, cancel

### FutarchyOracle

Contrat responsable de fournir la donnée qui permettra de valider la prédiction à échéance et ainsi rétribuer les gagnants de la prédiction.

- Attributes: result
- Functions: updateResult, getResult
