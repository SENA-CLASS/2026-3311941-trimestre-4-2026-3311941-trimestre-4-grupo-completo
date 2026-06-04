import { HttpResponse } from '@angular/common/http';
import { Component, OnInit, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { ICheckList } from 'app/entities/check-list/check-list.model';
import { CheckListService } from 'app/entities/check-list/service/check-list.service';
import { ILearningResult } from 'app/entities/learning-result/learning-result.model';
import { LearningResultService } from 'app/entities/learning-result/service/learning-result.service';
import { AlertError } from 'app/shared/alert/alert-error';
import { TranslateDirective } from 'app/shared/language';
import { IItemList } from '../item-list.model';
import { ItemListService } from '../service/item-list.service';

import { ItemListFormGroup, ItemListFormService } from './item-list-form.service';

@Component({
  selector: 'ceet-item-list-update',
  templateUrl: './item-list-update.html',
  imports: [TranslateDirective, TranslateModule, FontAwesomeModule, AlertError, ReactiveFormsModule],
})
export class ItemListUpdate implements OnInit {
  readonly isSaving = signal(false);
  itemList: IItemList | null = null;

  checkListsSharedCollection = signal<ICheckList[]>([]);
  learningResultsSharedCollection = signal<ILearningResult[]>([]);

  protected itemListService = inject(ItemListService);
  protected itemListFormService = inject(ItemListFormService);
  protected checkListService = inject(CheckListService);
  protected learningResultService = inject(LearningResultService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: ItemListFormGroup = this.itemListFormService.createItemListFormGroup();

  compareCheckList = (o1: ICheckList | null, o2: ICheckList | null): boolean => this.checkListService.compareCheckList(o1, o2);

  compareLearningResult = (o1: ILearningResult | null, o2: ILearningResult | null): boolean =>
    this.learningResultService.compareLearningResult(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ itemList }) => {
      this.itemList = itemList;
      if (itemList) {
        this.updateForm(itemList);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    globalThis.history.back();
  }

  save(): void {
    this.isSaving.set(true);
    const itemList = this.itemListFormService.getItemList(this.editForm);
    if (itemList.id === null) {
      this.subscribeToSaveResponse(this.itemListService.create(itemList));
    } else {
      this.subscribeToSaveResponse(this.itemListService.update(itemList));
    }
  }

  protected subscribeToSaveResponse(result: Observable<IItemList | null>): void {
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

  protected updateForm(itemList: IItemList): void {
    this.itemList = itemList;
    this.itemListFormService.resetForm(this.editForm, itemList);

    this.checkListsSharedCollection.update(checkLists =>
      this.checkListService.addCheckListToCollectionIfMissing<ICheckList>(checkLists, itemList.checkList),
    );
    this.learningResultsSharedCollection.update(learningResults =>
      this.learningResultService.addLearningResultToCollectionIfMissing<ILearningResult>(learningResults, itemList.learningResult),
    );
  }

  protected loadRelationshipsOptions(): void {
    this.checkListService
      .query()
      .pipe(map((res: HttpResponse<ICheckList[]>) => res.body ?? []))
      .pipe(
        map((checkLists: ICheckList[]) =>
          this.checkListService.addCheckListToCollectionIfMissing<ICheckList>(checkLists, this.itemList?.checkList),
        ),
      )
      .subscribe((checkLists: ICheckList[]) => this.checkListsSharedCollection.set(checkLists));

    this.learningResultService
      .query()
      .pipe(map((res: HttpResponse<ILearningResult[]>) => res.body ?? []))
      .pipe(
        map((learningResults: ILearningResult[]) =>
          this.learningResultService.addLearningResultToCollectionIfMissing<ILearningResult>(
            learningResults,
            this.itemList?.learningResult,
          ),
        ),
      )
      .subscribe((learningResults: ILearningResult[]) => this.learningResultsSharedCollection.set(learningResults));
  }
}
