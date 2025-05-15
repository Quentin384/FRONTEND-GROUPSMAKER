import { Injectable } from '@angular/core';
import { Liste } from '../../models/liste.model';
import { Personne } from '../../models/personne.model';

@Injectable({
  providedIn: 'root'
})
export class GroupesService {
  private listes: Liste[] = [];

  getListes(): Liste[] {
    return this.listes;
  }

  ajouterListe(nom: string): void {
    if (this.listes.find(l => l.nom === nom)) {
      return;
    }

    this.listes.push({
      nom,
      tirages: 0,
      personnes: []
    });
  }

  ajouterPersonneDansListe(nomListe: string, personne: Personne): void {
    const liste = this.listes.find(l => l.nom === nomListe);
    if (!liste) {
      console.warn(`Liste '${nomListe}' non trouvée`);
      return;
    }
    liste.personnes.push(personne);
  }

  /**
   * Forme des groupes aléatoires et équilibrés dans une liste.
   * @param nomListe Le nom de la liste à traiter.
   * @param tailleGroupe La taille maximale des groupes.
   * @returns Un tableau de groupes (tableaux de personnes).
   */
  formerGroupesAleatoires(nomListe: string, tailleGroupe: number): Personne[][] {
    const liste = this.listes.find(l => l.nom === nomListe);
    if (!liste) {
      console.warn(`Liste '${nomListe}' non trouvée`);
      return [];
    }

    const personnes = [...liste.personnes];

    // Mélanger aléatoirement (Fisher-Yates)
    for (let i = personnes.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [personnes[i], personnes[j]] = [personnes[j], personnes[i]];
    }

    // Calcul du nombre de groupes nécessaires
    const nombreGroupes = Math.ceil(personnes.length / tailleGroupe);

    // Création des groupes vides
    const groupes: Personne[][] = Array.from({ length: nombreGroupes }, () => []);

    // Répartition équilibrée : on distribue une personne par groupe en boucle
    personnes.forEach((personne, index) => {
      groupes[index % nombreGroupes].push(personne);
    });

    liste.tirages++;

    return groupes;
  }
}
