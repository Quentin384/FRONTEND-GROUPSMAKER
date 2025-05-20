import { TestBed } from '@angular/core/testing';
import { GroupesService, Groupe } from './groupes.service';
import { Personne } from '../../models/personne.model';

describe('GroupesService', () => {
  let service: GroupesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GroupesService);
  });

  it('devrait ajouter une liste et y ajouter des personnes', () => {
    service.ajouterListe('TestListe');
    const personnes: Personne[] = [
      {
        nom: 'Alice',
        genre: 'féminin',
        aisanceFrancais: 3,
        ancienDWWM: true,
        niveauTechnique: 2,
        profil: 'à l’aise',
        age: 30
      },
      {
        nom: 'Bob',
        genre: 'masculin',
        aisanceFrancais: 2,
        ancienDWWM: false,
        niveauTechnique: 3,
        profil: 'timide',
        age: 22
      }
    ];
    personnes.forEach(p => service.ajouterPersonneDansListe('TestListe', p));
    const listes = service.getListes();
    expect(listes.length).toBe(1);
    expect(listes[0].personnes.length).toBe(2);
  });

  it('devrait former 2 groupes sans critère', () => {
    service.ajouterListe('Simple');
    const noms = ['Groupe A', 'Groupe B'];

    const personnes: Personne[] = Array.from({ length: 6 }, (_, i) => ({
      nom: `Personne ${i}`,
      genre: 'masculin',
      aisanceFrancais: 3,
      ancienDWWM: false,
      niveauTechnique: 2,
      profil: 'à l’aise',
      age: 25
    }));

    personnes.forEach(p => service.ajouterPersonneDansListe('Simple', p));

    const groupes = service.formerGroupesAleatoires('Simple', 2, noms, []);
    expect(groupes.length).toBe(2);
    const total = groupes.reduce((sum, g) => sum + g.membres.length, 0);
    expect(total).toBe(6);
  });

  it('devrait former des groupes équilibrés selon anciensDWWM', () => {
    service.ajouterListe('MixAnciens');
    const noms = ['G1', 'G2'];

    const personnes: Personne[] = [
      { nom: 'Ancien1', genre: 'masculin', aisanceFrancais: 3, ancienDWWM: true, niveauTechnique: 2, profil: 'timide', age: 40 },
      { nom: 'Ancien2', genre: 'féminin', aisanceFrancais: 4, ancienDWWM: true, niveauTechnique: 1, profil: 'réservé', age: 35 },
      { nom: 'Nouveau1', genre: 'masculin', aisanceFrancais: 2, ancienDWWM: false, niveauTechnique: 3, profil: 'à l’aise', age: 26 },
      { nom: 'Nouveau2', genre: 'féminin', aisanceFrancais: 2, ancienDWWM: false, niveauTechnique: 2, profil: 'timide', age: 29 },
    ];

    personnes.forEach(p => service.ajouterPersonneDansListe('MixAnciens', p));

    const groupes = service.formerGroupesAleatoires('MixAnciens', 2, noms, ['anciensDWWM']);
    expect(groupes.length).toBe(2);
    expect(groupes[0].membres.length + groupes[1].membres.length).toBe(4);
  });

  it('ne devrait pas refaire un tirage si le dernier est validé', () => {
    service.ajouterListe('Validée');
    const noms = ['G1', 'G2'];

    for (let i = 0; i < 4; i++) {
      service.ajouterPersonneDansListe('Validée', {
        nom: `P${i}`,
        genre: 'féminin',
        aisanceFrancais: 3,
        ancienDWWM: false,
        niveauTechnique: 1,
        profil: 'à l’aise',
        age: 20
      });
    }

    const tirage1 = service.formerGroupesAleatoires('Validée', 2, noms, []);
    service.validerTirage('Validée');

    const tirage2 = service.formerGroupesAleatoires('Validée', 2, noms, []);
    expect(tirage2).toEqual(tirage1);
  });
});
