<script>
  import Counter from './lib/Counter.svelte';
  let text  = 'd';
  let groupName;
  console.log(groupName);

  function submitForm(){

  }
</script>

<main>
  <link href=" https://cdn.jsdelivr.net/npm/sweetalert2@11.7.5/dist/sweetalert2.min.css " rel="stylesheet">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
  <script defer src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
  <!-- sweetalert -->
  <script defer src=" https://cdn.jsdelivr.net/npm/sweetalert2@11.7.5/dist/sweetalert2.all.min.js "></script>

    <div class="container d-flex align-items-center justify-content-center py-4">
    <div class="card">
        <h1 class="text-lg-center my-3">New Group</h1>
        <div class="card-body">
            <div>
                <form  novalidate class="form g-3 needs-validation row d-flex align-items-center justify-content-center py-4">
                    <!-- Error messages -->
                    <span style="color:red" class="response"></span>

                    <!-- group thumbnail -->
                    <div class="col-md-5 col-xs-12">
                        <label class="form-label">Group Thumbnail</label>
                        <input class="form-control" type="file" id="thumbnail"/>
                    </div>

                    <!-- group Name -->
                    <div class="col-md-5">
                        <label class="form-label">Name</label>
                        <div class="input-group has-validation">
                            <input value={groupName} type="text" class="form-control" name="" id="groupName" required>
                        </div>
                        <div class="invalid-feedback">Please Enter The Group Name.</div>
                        <div class="valid-feedback">Looks Good.</div>
                    </div>

                    <!-- specifay the university -->
                    <div class="col-md-5">
                        <label for="university">Spesifay university</label>
                        <div class="input-group has-validation">
                            <select  class="form-select" name="" id="university" required>
                                <option selected disabled hidden>....</option>
                                <!-- <% university.forEach( (item,i) => { %>
                                    <option value=<%= i %>><%= item %></option>
                                <% }) %> -->
                            </select>
                        </div>
                        <div class="invalid-feedback">Please Enter Subject Name.</div>
                        <div class="valid-feedback">Looks Good.</div>
                    </div>

                    <!-- Subject Name -->
                    <div class="col-md-5">
                        <label class="form-label">Subject Name</label>
                        <div class="input-group has-validation">
                            <input type="text" class="form-control" name="" id="subjectName" required>
                        </div>
                        <div class="invalid-feedback">Please Enter Subject Name.</div>
                        <div class="valid-feedback">Looks Good.</div>
                    </div>

                    <!-- Section Number -->
                    <div class="col-md-2">
                        <label for="validationCustom04" class="form-label">Section</label>
                        <input class="form-control" type="number" name="" id="sectionNumber" required>
                        <div class="invalid-feedback">Please Enter Section Number.</div>
                        <div class="valid-feedback">Looks Good.</div>
                    </div>

                    <!-- male or female -->
                    <div class="col-md-3">
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" value="Male" type="radio" name="gender" id="inlineRadio1"  required>
                            <label class="form-check-label" for="inlineRadio1">Male</label>
                          </div>
                          <div class="form-check form-check-inline">
                            <input class="form-check-input" value="Female" type="radio" name="gender" id="inlineRadio2" required>
                            <label class="form-check-label" for="inlineRadio2">Female</label>
                        </div>
                        <div class="invalid-feedback">Please choose a Gender.</div>
                        <div class="valid-feedback">Looks Good.</div>
                    </div>
                    
                    <!-- whatsapp or Telegram or other -->
                    <div class="col-md-3">
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" value="Whatsapp" type="radio" name="group_type" id="inlineRadio1"  required>
                            <label class="form-check-label" for="inlineRadio1">Whatsapp</label>
                          </div>
                          <div class="form-check form-check-inline">
                            <input class="form-check-input" value="Telegram" type="radio" name="group_type" id="inlineRadio2" required>
                            <label class="form-check-label" for="inlineRadio2">Telegram</label>
                        </div>
                          <div class="form-check form-check-inline">
                            <input class="form-check-input" value="Other" type="radio" name="group_type" id="inlineRadio2"  required>
                            <label class="form-check-label" for="inlineRadio2">Other</label>
                        </div>
                        <div class="invalid-feedback">Please choose a Group Platform.</div>
                        <div class="valid-feedback">Looks Good.</div>
                    </div>

                    <!-- Group Link -->
                    <div class="col-md-5">
                        <label class="form-label">Group Link</label>
                        <div class="input-group has-validation">
                            <input type="url" class="form-control" name="" id="groupLink" required>
                        </div>
                        <div class="invalid-feedback">Please Enter Group Link.</div>
                        <div class="valid-feedback">Looks Good.</div>
                    </div>

                    <!-- submit button -->
                    <div class="col-md-3">
                        <button type="submit" class="submit btn btn-outline-dark ">Applay</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
  <div class="card">
    <Counter />
  </div>

  <script>
    async function getCollege(){
        const sel = document.getElementById("university").value;

        const res = await fetch("/add-group/select-element", {
            method : "post",
            body : JSON.stringify({university : sel})
        })
    }
</script>
<!-- validate inputs -->
<script>
    (function () {
    'use strict'

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
        .forEach(function (form) {
        form.addEventListener('submit', function (event) {
            if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
            }

            form.classList.add('was-validated')
        }, false)
        })
    })()
</script>
<!-- End  validation inputs -->

<script>
    const form          = document.querySelector("form");
    const response      = document.querySelector(".response");
    const thumbnail     = document.querySelector("#thumbnail");
    const groupName     = document.querySelector("#groupName");
    const subjectName   = document.querySelector("#subjectName");
    const sectionNumber = document.querySelector("#sectionNumber");
    // const gender        = document.querySelector('input[name="gender"]');
    // const group_type    = document.querySelector('input[name="group_type"]');
    const groupLink     = document.querySelector("#groupLink");
    const submit        = document.querySelector(".submit");


    form.addEventListener('submit', async e => {
        e.preventDefault()
        const gender = document.querySelector('input[name="gender"]:checked').value;
        const groupType = document.querySelector('input[name="group_type"]:checked').value;
        console.log(thumbnail.files[0]);

        // set data as a form
                const formData = new FormData();
                formData.append('groupName' , groupName.value)
                formData.append('subjectName' , subjectName.value)
                formData.append('sectionNumber' , sectionNumber.value)
                formData.append('gender' ,gender)
                formData.append('groupType' , groupType)
                formData.append('groupLink' , groupLink.value)
                formData.append('thumbnail' , thumbnail.files[0]);
                console.log(formData)
            

        //send data
        const response = await fetch("/groups/insert-group", {
            method : "POST",
            credentials :"include",
            body : formData
        });
        const data = await response.json();

        //sweetalert Toast
        const Toast = Swal.mixin({
                toast:true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3500,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
        })

        // check if there is an error
        if(data.err_msg){

            Toast.fire({
                icon:'error',
                title: data.err_msg
            });
        }

        else if(data.success){
            Toast.fire({
                icon:'success',
                title: "Group Added"
            });
            return window.location.replace("/");
        }
    })

</script>
</main>

<style>
  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.svelte:hover {
    filter: drop-shadow(0 0 2em #ff3e00aa);
  }
  .read-the-docs {
    color: #888;
  }
</style>
