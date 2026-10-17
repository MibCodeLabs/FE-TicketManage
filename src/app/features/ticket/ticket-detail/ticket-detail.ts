import { Component } from '@angular/core';
import { TicketComments } from '../components/ticket-comments/ticket-comments';
import { ActivatedRoute } from '@angular/router';
import { EditorComponent, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

interface Ticket {
  title: string;
  description: string;
  status: string;
  issuedBy: string;
  assignedTo: string;
  createdAt?: Date | string;
  expiryDate?: Date | string | null;
}

interface Attachment {
  name: string;
  size: string;
  url?: string;
}
@Component({
  providers: [{ provide: TINYMCE_SCRIPT_SRC, useValue: '/tinymce/tinymce.min.js' }],
  selector: 'app-ticket-detail',
  imports: [TicketComments, EditorComponent, FormsModule, DatePipe],
  templateUrl: './ticket-detail.html',
  styleUrl: './ticket-detail.css',
})
export class TicketDetail {
  readonly maxFiles = 10;
  readonly maxTotalSize = 100 * 1024 * 1024; // 100 MiB

  ticketId: string | null = null;
  isNew = false;
  isEdit = false;
  constructor(private route: ActivatedRoute) {
    const currentRoute = this.route;

    let routePath = '';

    while (currentRoute) {
      routePath += '/' + currentRoute.snapshot.url.map((segment) => segment.path).join('/');

      if (!currentRoute.firstChild) {
        break;
      }

      // This only traverses the snapshot tree.
      break;
    }

    this.ticketId = this.route.snapshot.paramMap.get('id');
    this.isNew = routePath.split('/').includes('new');
  }

  ticket: Ticket = {
    title: 'Unable to access account settings',
    description: 'I am unable to access my account settings page.',
    status: 'Unassigned',
    issuedBy: 'John Doe',
    assignedTo: '',
  };

  attachments: Attachment[] = [];
  selectedFiles: File[] = [];

  startEdit(): void {
    this.isEdit = true;
  }

  cancelEdit(): void {
    this.isEdit = false;
    // Restore the original ticket here if edits should be discarded.
  }

  goBack(): void {
    // Navigate back to your ticket list.
  }

  onFilesSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const incomingFiles = Array.from(input.files ?? []);

    let isDuplicate = false;
    let duplicateFileNames: string[] = [];
    for (const file of incomingFiles) {
      this.selectedFiles.forEach((f) => {
        if (f.name === file.name && f.size === file.size && f.type === file.type && f !== file) {
          isDuplicate = true;
          duplicateFileNames.push(file.name);
        }
      });
    }
    if (isDuplicate) {
      alert(`${duplicateFileNames} already present. Duplicate Files not allowed`);
      return;
    }

    const combinedFiles = [...this.selectedFiles, ...incomingFiles];
    const totalSize = combinedFiles.reduce((total, file) => total + file.size, 0);

    if (combinedFiles.length > this.maxFiles) {
      alert(`You can select a maximum of ${this.maxFiles} files.`);
      return;
    }
    if (totalSize > this.maxTotalSize) {
      alert('The combined size of attachments cannot exceed 100 MiB.');
      return;
    }

    this.selectedFiles = combinedFiles;

    input.value = '';
  }

  removeSelectedFile(index: number): void {
    this.selectedFiles.splice(index, 1);
  }

  downloadAttachment(attachment: Attachment): void {
    if (attachment.url) {
      window.open(attachment.url, '_blank', 'noopener,noreferrer');
    }
  }

  createTicket(): void {
    const formData = new FormData();

    formData.append('Title', this.ticket.title);
    formData.append('Description', this.ticket.description);
    formData.append('Status', this.ticket.status);

    if (this.ticket.assignedTo) {
      formData.append('AssignedTo', this.ticket.assignedTo);
    }

    if (this.ticket.expiryDate) {
      const expiryDate =
        this.ticket.expiryDate instanceof Date
          ? this.ticket.expiryDate.toISOString()
          : this.ticket.expiryDate;

      formData.append('ExpiryDate', expiryDate);
    }

    for (const file of this.selectedFiles) {
      formData.append('Attachments', file, file.name);
    }

    console.log('FormData contents:');

    for (const [key, value] of formData.entries()) {
      console.log(
        key,
        value instanceof File
          ? {
              name: value.name,
              size: value.size,
              type: value.type,
            }
          : value,
      );
    }
  }

  updateTicket(): void {
    // Call your ticket update service.
    // Include this.ticket and this.selectedFiles in the request.
  }
}
