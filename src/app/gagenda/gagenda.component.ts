import { Component, OnInit, ViewChild } from '@angular/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'; // Interaction plugin for selectable events
import frLocale from '@fullcalendar/core/locales/fr';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { VoitureService } from '../voiture.service';


@Component({
  selector: 'app-gagenda',
  templateUrl: './gagenda.component.html',
  styleUrls: ['./gagenda.component.css']
})
export class GagendaComponent implements OnInit {
  private apiUrl = 'http://localhost:4000/rdv';
  private apiUrl1 = 'http://localhost:4000/user';
  private apiUrl2 = 'http://localhost:4000/vehicules';
  private apiUrl3 = 'http://localhost:4000/mecanicien';



  @ViewChild('calendar') calendarComponent!: FullCalendarComponent; // Non-null assertion

  showModal = false;
  appointmentForm: FormGroup;
  showUpdateModal = false;
  updateForm: FormGroup;
  selectedDateInfo: DateSelectArg | null = null;
  rdv: any[] = [];
  vehicules: any[] = [];
  vehicule: any = {
    make: '',
    model: '',
    immatriculation: '',
  };
  mecanicien: any[] = [];
  showRdvDetails = false; // New state for displaying rdv details
  selectedRdv: any = null; // To hold the selected rdv details
  selectedEventId: string | any = null;



  makes: string[] = [];
  models: string[] = [];
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin], // Added interactionPlugin
    initialView: 'dayGridMonth',
    locale: frLocale,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this)
  };

  constructor(private fb: FormBuilder, private http: HttpClient, private toastr: ToastrService,     private carDataService: VoitureService, 
  ) {
    const userEmail = localStorage.getItem('userEmail') || '';
    this.appointmentForm = this.fb.group({
      status: ['', Validators.required],
      datesouhaite: ['', Validators.required],
      heuresouhaite: ['', Validators.required],
      titre: ['', Validators.required],
      desc: [''],
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      vehicule: this.fb.group({
            immatriculation: ['', Validators.required],
            make: ['', Validators.required],
            model: ['', Validators.required], 
          }),
      dateRestitution: ['', Validators.required],
      heureRestitution: ['', Validators.required],
      mecanicien: ['', Validators.required],
      titrepres: ['', Validators.required],
      titreTache: ['', Validators.required],
      dateTache: ['', Validators.required],
      debutTache: ['', Validators.required],
      finTache: ['', Validators.required],
      emailperso: [userEmail, [Validators.required, Validators.email]],
    });
    this.updateForm = this.fb.group({
      status: ['', Validators.required],
      datesouhaite: ['', Validators.required],
      heuresouhaite: ['', Validators.required],
      titre: ['', Validators.required],
      desc: [''],
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      vehicule: this.fb.group({
            immatriculation: ['', Validators.required],
            make: ['', Validators.required],
            model: ['', Validators.required], 
          }),
      dateRestitution: ['', Validators.required],
      heureRestitution: ['', Validators.required],
      mecanicien: ['', Validators.required],
      titrepres: ['', Validators.required],
      titreTache: ['', Validators.required],
      dateTache: ['', Validators.required],
      debutTache: ['', Validators.required],
      finTache: ['', Validators.required],
      emailperso: [userEmail, [Validators.required, Validators.email]],
  });
}

 

  ngOnInit(): void {
    setTimeout(() => this.fetchRdvByEmailPerso(), 0);
    this.makes = this.carDataService.getMakes();
    this.fetchMecaniciens();

  }

  fetchMecaniciens(): void {
    const userEmail = localStorage.getItem('userEmail');
    if (!userEmail) {
      this.toastr.error('Email not found in localStorage');
      return;
    }
    this.http.get<any[]>(`${this.apiUrl3}/user/${userEmail}`).subscribe(
      (data) => {
        console.log('Mecaniciens fetched:', data); // Log to verify data structure
        this.mecanicien = data;
        if (this.mecanicien.length === 0) {
          console.log('Pas de mécaniciens trouvés');
        }
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching mecaniciens:', error);
      }
    );
  }
  

  onMakeChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    const make = target.value;
    this.models = this.carDataService.getModels(make);
    this.vehicule.model = ''; 
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    this.selectedDateInfo = selectInfo;
    this.appointmentForm.patchValue({ datesouhaite: selectInfo.startStr, dateTache: selectInfo.startStr, dateRestitution: selectInfo.startStr });
    this.showModal = true;
  }

  handleEventClick(clickInfo: EventClickArg) {
    this.selectedRdv = clickInfo.event;
    this.selectedEventId = clickInfo.event.id; // Update this line
    this.showRdvDetails = true;
  }
  
  closeRdvDetails() {
    this.showRdvDetails = false;
    this.selectedRdv = null;
  }

  handleEvents(events: EventApi[]) {
    // Handle events changes here
  }

  renderDayCellContent(arg: any) {
    const dateStr = arg.date.toISOString().split('T')[0];
    const button = document.createElement('button');
    button.innerHTML = '<i class="fas fa-plus"></i>';
    button.classList.add('add-event-button');
    button.addEventListener('click', () => this.openForm(dateStr));
    arg.el.appendChild(button);
  }

  openForm(dateStr: string) {
    this.selectedDateInfo = {
      startStr: dateStr,
      endStr: dateStr,
      allDay: true
    } as DateSelectArg;
    this.showModal = true;
    this.appointmentForm.patchValue({ datesouhaite: dateStr, dateTache: dateStr, dateRestitution: dateStr });
  }

  closeModal() {
    this.showModal = false;
    this.selectedDateInfo = null;
  }

  closeUpdateModal() {
    this.showUpdateModal = false;

  }
  onSubmit() {
    if (this.appointmentForm.valid && this.selectedDateInfo) {
      // Extract form values
      const formValues = this.appointmentForm.value;
  
      // Log form values for debugging
      console.log('Submitting form values:', formValues);
      console.log('Selected date info:', this.selectedDateInfo);
  
      // Ensure endStr is set; default to startStr if not provided
      const endStr = this.selectedDateInfo.endStr || this.selectedDateInfo.startStr;
  
      // Prepare event data for FullCalendar
      const eventData = {
        title: formValues.titre,
        start: this.selectedDateInfo.startStr,
        end: endStr, // Ensure end date is provided
        allDay: this.selectedDateInfo.allDay,
        extendedProps: {
          status: formValues.status,
          description: formValues.desc,
          nom: formValues.nom,
          prenom: formValues.prenom,
          immatriculation: formValues.vehicule?.immatriculation || '', // Default to empty string if undefined
          make: formValues.vehicule?.make || '',
          model: formValues.vehicule?.model || '',
          dateRestitution: formValues.dateRestitution ? new Date(formValues.dateRestitution).toISOString() : '',
          heureRestitution: formValues.heureRestitution || '',
          mecanicien: formValues.mecanicien || '',
          titrepres: formValues.titrepres || '',
          titreTache: formValues.titreTache || '',
          dateTache: formValues.dateTache ? new Date(formValues.dateTache).toISOString() : '',
          debutTache: formValues.debutTache || '',
          finTache: formValues.finTache || ''
        }
      };
  
      // Add event to FullCalendar
      const calendarApi = this.calendarComponent.getApi();
      if (calendarApi) {
        calendarApi.addEvent(eventData);
        console.log('Event added to FullCalendar:', eventData);
      } else {
        console.error('Calendar API is not available');
        this.toastr.error('Erreur lors de l\'ajout de l\'événement au calendrier');
      }
  
      // Send data to the backend
      this.http.post<any>(`${this.apiUrl}/addrdv1`, formValues)
        .subscribe(
          (response) => {
            console.log('Rendez-vous ajouté avec succès:', response);
            this.toastr.success('Rendez-vous ajouté avec succès');
            this.fetchRdvByEmailPerso(); // Refresh the list of appointments
            this.closeModal(); // Close the modal
          },
          (error: HttpErrorResponse) => {
            console.error('Erreur lors de l\'ajout du rendez-vous:', error);
            if (error.status === 400) {
              this.toastr.error('Données invalides. Veuillez vérifier les informations saisies.');
            } else {
              this.toastr.error('Erreur lors de l\'ajout du rendez-vous');
            }
          }
        );
    } else {
      console.warn('Formulaire non valide ou aucune date sélectionnée');
      this.toastr.warning('Veuillez remplir tous les champs obligatoires');
    }
  }
  
  
  
  

  fetchRdvByEmailPerso(): void {
    const emailperso = localStorage.getItem('userEmail');
    if (!emailperso) {
      console.error('No email found in localStorage');
      return;
    }
    this.http.get<any[]>(`${this.apiUrl}/rdvbyemailperso/${emailperso}`)
      .subscribe(
        async (response) => {
          this.rdv = response || [];
          await this.fetchUserDetailsForRdv();
          this.addEventsToCalendar();
        },
        (error) => {
          console.error('Erreur lors de la récupération des rendez-vous par email:', error);
        }
      );
  }

  async fetchUserDetailsForRdv(): Promise<void> {
    for (const rdvItem of this.rdv) {
      try {
        const userResponse = await this.http.get<{ nom?: string, prenom?: string }>(`${this.apiUrl1}/getnomprenom/${rdvItem.email}`).toPromise();
        if (userResponse && userResponse.nom && userResponse.prenom) {
          rdvItem.nom = userResponse.nom;
          rdvItem.prenom = userResponse.prenom;
        } else {
          console.warn(`No user details found for email ${rdvItem.email}`);
        }
      } catch (error) {
        console.error(`Erreur lors de la récupération des informations utilisateur pour l'email ${rdvItem.email}:`, error);
      }
    }
  }

  addEventsToCalendar(): void {
    if (!this.calendarComponent) {
      console.error("Calendar component is not available.");
      return;
    }
  
    const calendarApi = this.calendarComponent.getApi();
  
    if (!calendarApi) {
      console.error("Calendar API is not available.");
      return;
    }
  
    for (const rdv of this.rdv) {
      let eventClass = '';
      switch (rdv.status.toLowerCase()) {
        case 'en cours':
          eventClass = 'event-en-cours';
          break;
        case 'terminé':
          eventClass = 'event-termine';
          break;
        case 'annulé':
          eventClass = 'event-annule';
          break;
        default:
          eventClass = ''; // Aucune classe particulière
      }
  
      calendarApi.addEvent({
        title: `${rdv.nom} ${rdv.prenom} // Devis ${rdv.numdevis} / ${rdv.heuresouhaite}H`,
        start: rdv.datesouhaite,
        allDay: true,
        // Ajoutez un style inline pour tester
        backgroundColor: rdv.status === 'En cours' ? '#0f5bd4' : rdv.status === 'Terminé' ? 'green' : 'red',
        textColor: 'white',
        extendedProps: {
          status: `${rdv.status} `,
          prestation: `${rdv.titrepres} `,
          heuresouhaite : `${rdv.heuresouhaite}H `,
          titre : `${rdv.titre}`,
          numdevis : `${rdv.numdevis}`,
          immatriculation : `${rdv.vehicule.immatriculation}`,
          model : `${rdv.vehicule.model}`,
          mecanicien : `${rdv.mecanicien}`,


        }
      });
    } } 
    
    openUpdateForm(rdv : any): void {
      this.selectedRdv = { ...rdv };
      this.showUpdateModal= true;
    }
    
    
    
    updateAppointment(): void {
      if (this.updateForm.valid && this.selectedRdv) {
        const formValue = this.updateForm.value;
    
        this.http.put<any>(`${this.apiUrl}/update/${this.selectedRdv._id}`, formValue).subscribe(
          (updatedRdv) => {
            const index = this.rdv.findIndex((v) => v._id === this.selectedRdv._id);
            if (index !== -1) {
              this.rdv[index] = updatedRdv;
            }
    
            this.updateForm.reset(); // Reset the form
            this.showUpdateModal = false; // Hide the update modal
            this.selectedRdv = null; // Clear selectedRdv
            this.toastr.success('Rendez-vous mis à jour avec succès');
          },
          (error) => {
            this.toastr.error('Erreur lors de la mise à jour du rendez-vous');
            console.error('Error updating appointment:', error);
          }
        );
      } else {
        this.toastr.error('Veuillez remplir tous les champs obligatoires.');
      }
    }
    

    
      
  printAgenda() {
    window.print();
  }
}
