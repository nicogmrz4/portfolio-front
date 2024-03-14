import { Injectable, inject } from "@angular/core";
import { SnackbarService } from "../services/snackbar.service";
import { HttpErrorResponse } from "@angular/common/http";
import { EMPTY, Observable } from "rxjs";
import { CREATE_PROJECT_ERROR, CREATE_PROJECT_TAG_ERROR, DELETE_PROJECT_ERROR, EDIT_PROJECT_ERROR, LOAD_PROJECTS_ERROR, LOAD_PROJECT_TAGS_ERROR, UPDATE_PROJECT_PREVIEW_ERROR } from "../utils/errorMessages";

@Injectable({
	providedIn: 'root',
})
export class ProjectErrorHandler {
	private readonly snackbarSvc = inject(SnackbarService);

	private _handleLoadError(err: HttpErrorResponse): Observable<never> {
		this.snackbarSvc.open(LOAD_PROJECTS_ERROR)
		return EMPTY;
	}	
	
	private _handleCreateError(err: HttpErrorResponse): Observable<never> {
		this.snackbarSvc.open(CREATE_PROJECT_ERROR)
		return EMPTY;
	}
	
	private _handleUploadPreviewError(err: HttpErrorResponse): Observable<never> {
		this.snackbarSvc.open(UPDATE_PROJECT_PREVIEW_ERROR)
		return EMPTY;
	}
	
	private _handleEditError(err: HttpErrorResponse): Observable<never> {
		this.snackbarSvc.open(EDIT_PROJECT_ERROR)
		return EMPTY;
	}	
	
	private _handleDeleteError(err: HttpErrorResponse): Observable<never> {
		this.snackbarSvc.open(DELETE_PROJECT_ERROR)
		return EMPTY;
	}
	
	private _handleLoadTagsError(err: HttpErrorResponse): Observable<never> {
		this.snackbarSvc.open(LOAD_PROJECT_TAGS_ERROR)
		return EMPTY;
	}	
	
	private _handleCreateTagError(err: HttpErrorResponse): Observable<never> {
		this.snackbarSvc.open(CREATE_PROJECT_TAG_ERROR)
		return EMPTY;
	}

	get handleLoadError() {
		return this._handleLoadError.bind(this);
	}

	get handleCreateError() {
		return this._handleCreateError.bind(this);
	}

	get handleUploadPreviewError() {
		return this._handleUploadPreviewError.bind(this);
	}

	get handleEditError() {
		return this._handleEditError.bind(this);
	}

	get handleDeleteError() {
		return this._handleDeleteError.bind(this);
	}

	get handleCreateTagError() {
		return this._handleCreateTagError.bind(this);
	}

	get handleLoadTagsError() {
		return this._handleLoadTagsError.bind(this);
	}
}