import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-prestations',
  templateUrl: './prestations.component.html',
  styleUrls: ['./prestations.component.css']
})
export class PrestationsComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void { }

  prestations = [
    {
      titre: 'FORFAIT RÉVISION',
      image: '.././assets/revision.jpg',
      details: [
        'Vérification et remplacement des filtres à huile, air, carburant et habitacle.',
        'Contrôle et remplacement de l’huile moteur.',
        'Inspection des niveaux de liquide de refroidissement et de frein.',
        'Contrôle des plaquettes et disques de frein.'
      ],
      usageTypes: ['Utilisation essentiellement en ville', 'Parcours soumis aux emboutaillages', 'Diminution de la performance du moteur.',
        'Augmentation de la consommation de carburant.',
        'Usure prématurée des pièces mécaniques.',
        'Problèmes de freinage.'],
      specificOptions: ['Filtres', 'Huile', 'Liquides', 'Freins']
    },
    {
      titre: 'FORFAIT FREINAGE',
      image: '.././assets/freinage.jpg',
      details: [
        'Remplacement des plaquettes de frein avant et arrière.',
        'Remplacement des disques de frein si nécessaire.',
        'Contrôle et purge du liquide de frein.',
        'Vérification du système de freinage ABS.'
      ],
      usageTypes: ['Utilisation essentiellement en ville', 'Parcours soumis aux emboutaillages',         'Bruits anormaux lors du freinage.',
        'Allongement de la distance de freinage.',
        'Vibrations au niveau de la pédale de frein.',
        'Voyant de frein allumé.'],      specificOptions: ['Plaquettes', 'Disques', 'Liquide de frein', 'ABS']
    },
    {
      titre: 'FORFAIT AMORTISSEUR',
      image: '.././assets/amorti.jpg',
      details: [
        'Remplacement des amortisseurs usés ou défectueux.',
        'Vérification des supports et coupelles d’amortisseurs.',
        'Contrôle de l’état des ressorts de suspension.',
        'Test de la géométrie et alignement des roues.'
      ],
      usageTypes: ['Utilisation essentiellement en ville', 'Parcours soumis aux emboutaillages',        'Instabilité du véhicule.',
        'Usure irrégulière des pneus.',
        'Bruitage au passage sur des bosses.',
        'Diminution du confort de conduite.'],       
      specificOptions: ['Amortisseurs', 'Supports', 'Coupelles', 'Ressorts']
    },
    {
      titre: 'FORFAIT EMBRAYAGE',
      image: '.././assets/embrayage.jpeg',
      details: [
        'Le disque d\'embrayage: Usure ou patinage.',
        'Le mécanisme d\'embrayage: Problème de débrayage.',
        'Remplacement du câble ou du système hydraulique.',
        'Inspection de la butée d\'embrayage.'
      ],
      usageTypes: ['Utilisation essentiellement en ville', 'Parcours soumis aux emboutaillages',        'Patinage de l\'embrayage.',
        'Difficulté à passer les vitesses.',
        'Bruits anormaux lors de l\'embrayage.',
        'Perte de puissance.'], 
        specificOptions: ['Disque', 'Mécanisme', 'Câble', 'Butée']
    },
    {
      titre: 'DÉMARRAGE',
      image: '.././assets/demarrage.jpg',
      details: [
        'Test de la batterie et remplacement si nécessaire.',
        'Contrôle du démarreur et de l’alternateur.',
        'Vérification du système d’allumage.',
        'Inspection des câbles et connexions électriques.'
      ],
      usageTypes: ['Utilisation essentiellement en ville', 'Parcours soumis aux emboutaillages',         'Difficulté à démarrer le véhicule.',
    'Panne de batterie fréquente.',
    'Bruits anormaux au démarrage.',
    'Voyant de batterie allumé.'], 
      specificOptions: ['Batterie', 'Démarreur', 'Alternateur', 'Allumage']
    },
    {
      titre: 'FORFAIT KIT DE DISTRIBUTION',
      image: '.././assets/kit.jpg',
      details: [
        'Remplacement de la courroie de distribution.',
        'Changement des galets tendeurs et enrouleurs.',
        'Remplacement de la pompe à eau.',
        'Vérification des joints et autres éléments associés.'
      ],
      usageTypes: ['Utilisation essentiellement en ville', 'Parcours soumis aux emboutaillages', 'Bruits anormaux venant du moteur.',
    'Fuites de liquide de refroidissement.',
    'Moteur qui cale fréquemment.',
    'Diminution des performances du moteur.'],
      specificOptions: ['Courroie', 'Galets', 'Pompe à eau', 'Joints']
    },
    {
      titre: 'DIRECTION',
      image: '.././assets/direction.jpeg',
      details: [
        'Contrôle et ajustement de la géométrie.',
        'Inspection et remplacement des rotules de direction.',
        'Vérification de la crémaillère de direction.',
        'Contrôle du niveau et de l’état du liquide de direction assistée.'
      ],
      usageTypes: ['Utilisation essentiellement en ville', 'Parcours soumis aux emboutaillages',  'Difficulté à tourner le volant.',
    'Jeu excessif dans la direction.',
    'Bruits anormaux lors des virages.',
    'Fuite de liquide de direction assistée.'], 
      specificOptions: ['Géométrie', 'Rotules', 'Crémaillère', 'Liquide']
    },
    {
      titre: 'FORFAIT ÉCHAPPEMENT',
      image: '.././assets/echap.jpeg',
      details: [
        'Inspection du silencieux et du catalyseur.',
        'Contrôle et remplacement des joints d’étanchéité.',
        'Vérification des fixations et supports d’échappement.',
        'Test des émissions pour conformité aux normes.'
      ],
      usageTypes: ['Utilisation essentiellment en ville', 'Parcours soumis aux emboutaillages',  'Bruits anormaux provenant de l\'échappement.',
        'Odeurs de gaz d\'échappement dans l\'habitacle.',
        'Perte de puissance du moteur.',
        'Voyant moteur allumé.'], 
      specificOptions: ['Silencieux', 'Catalyseur', 'Joints', 'Supports']
    },
    {
      titre: 'FORFAIT CLIMATISATION',
      image: '.././assets/clim.jpg',
      details: [
        'Recharge du gaz réfrigérant.',
        'Contrôle du compresseur et des conduites.',
        'Vérification du bon fonctionnement des ventilateurs.',
        'Nettoyage et désinfection du circuit de climatisation.'
      ],
      usageTypes: ['Utilisation essentiellement en ville', 'Parcours soumis aux emboutaillages','Air conditionné ne fonctionne pas correctement.',
    'Bruitage au niveau du compresseur.',
    'Odeurs désagréables provenant des bouches d\'aération.',
    'Fuites de liquide réfrigérant.'], 
      specificOptions: ['Gaz', 'Compresseur', 'Conduites', 'Ventilateurs']
    }
  ];
 
  onPrestationClick(prestation: any): void {
    this.router.navigate(['/devis'], { queryParams: { prestation: JSON.stringify(prestation) } });
  }
}
