import { Injectable, inject } from "@angular/core";
import { SnackbarService } from "../services/snackbar.service";
import { HttpErrorResponse } from "@angular/common/http";
import { EMPTY, Observable } from "rxjs";
import { CREATE_SKILL_ERROR, DELETE_SKILL_ERROR, EDIT_SKILL_ERROR, LOAD_SKILLS_ERROR, UPDATE_SKILL_ICON_ERROR } from "../utils/errorMessages";

@Injectable({
	providedIn: 'root',
})
export class SkillErrorHandler {
	private readonly snackbarSvc = inject(SnackbarService);

	private _handleLoadError(err: HttpErrorResponse): Observable<never> {
		this.snackbarSvc.open(LOAD_SKILLS_ERROR)
		return EMPTY;
	}	
	
	private _handleCreateError(err: HttpErrorResponse): Observable<never> {
		this.snackbarSvc.open(CREATE_SKILL_ERROR)
		return EMPTY;
	}
	
	private _handleUploadIconError(err: HttpErrorResponse): Observable<never> {
		this.snackbarSvc.open(UPDATE_SKILL_ICON_ERROR)
		return EMPTY;
	}
	
	private _handleEditError(err: HttpErrorResponse): Observable<never> {
		this.snackbarSvc.open(EDIT_SKILL_ERROR)
		return EMPTY;
	}	
	
	private _handleDeleteError(err: HttpErrorResponse): Observable<never> {
		this.snackbarSvc.open(DELETE_SKILL_ERROR)
		return EMPTY;
	}
	
	get handleLoadError() {
		return this._handleLoadError.bind(this);
	}

	get handleCreateError() {
		return this._handleCreateError.bind(this);
	}

	get handleUploadIconError() {
		return this._handleUploadIconError.bind(this);
	}

	get handleEditError() {
		return this._handleEditError.bind(this);
	}

	get handleDeleteError() {
		return this._handleDeleteError.bind(this);
	}
}