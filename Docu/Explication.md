Le GroupesService est un service Angular qui sert à gérer des listes de personnes et à former des groupes aléatoires avec elles.

Il contient un tableau listes[], où chaque liste a un nom, un nombre de tirages, et une liste de personnes.
Il a aussi un historiqueTirages, pour mémoriser les anciens tirages liés à chaque liste.

On peut :

ajouter une nouvelle liste avec ajouterListe,

ajouter une personne à une liste avec ajouterPersonneDansListe,

former des groupes via formerGroupesAleatoires.

Lors de la formation, il peut prendre en compte certains critères de mixité, comme :

la répartition des anciens DWWM,

ou la diversité d'âge (jeune, moyen, senior).

Une fois les groupes générés, le service vérifie s’ils ont déjà été tirés auparavant. Si oui, il bloque.
Sinon, il enregistre le tirage dans l’historique avec un statut valide = false.

On peut valider ce tirage plus tard avec validerTirage(), ce qui empêche toute modification future.