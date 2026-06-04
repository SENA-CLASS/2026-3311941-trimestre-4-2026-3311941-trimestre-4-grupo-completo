import { Component, OnInit, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { State } from 'app/entities/enumerations/state.model';
import { AlertError } from 'app/shared/alert/alert-error';
import { TranslateDirective } from 'app/shared/language';
import { IDocumentType } from '../document-type.model';
import { DocumentTypeService } from '../service/document-type.service';

import { DocumentTypeFormGroup, DocumentTypeFormService } from './document-type-form.service';

@Component({
  selector: 'ceet-document-type-update',
  templateUrl: './document-type-update.html',
  imports: [TranslateDirective, TranslateModule, FontAwesomeModule, AlertError, ReactiveFormsModule],
})
export class DocumentTypeUpdate implements OnInit {
  readonly isSaving = signal(false);
  documentType: IDocumentType | null = null;
  stateValues = Object.keys(State);

  protected documentTypeService = inject(DocumentTypeService);
  protected documentTypeFormService = inject(DocumentTypeFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: DocumentTypeFormGroup = this.documentTypeFormService.createDocumentTypeFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ documentType }) => {
      this.documentType = documentType;
      if (documentType) {
        this.updateForm(documentType);
      }
    });
  }

  previousState(): void {
    globalThis.history.back();
  }

  save(): void {
    this.isSaving.set(true);
    const documentType = this.documentTypeFormService.getDocumentType(this.editForm);
    if (documentType.id === null) {
      this.subscribeToSaveResponse(this.documentTypeService.create(documentType));
    } else {
      this.subscribeToSaveResponse(this.documentTypeService.update(documentType));
    }
  }

  protected subscribeToSaveResponse(result: Observable<IDocumentType | null>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving.set(false);
  }

  protected updateForm(documentType: IDocumentType): void {
    this.documentType = documentType;
    this.documentTypeFormService.resetForm(this.editForm, documentType);
  }
}
