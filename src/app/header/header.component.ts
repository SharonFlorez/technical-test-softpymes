import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(private _router: Router, private _userService: UserService) {}

  ngOnInit(): void {}

  public logout() {
    this._userService
      .logout()
      .then(() => {
        Swal.fire({
          title: '¿Quieres cerrar sesión?',
          showDenyButton: false,
          showCancelButton: true,
          confirmButtonText: 'Si',
          cancelButtonText: 'No',
        }).then((result) => {
          if (result.isConfirmed) {
            this._router.navigate(['/']);
          }
        });
      })
      .catch((error) => console.log(error));
  }
}
