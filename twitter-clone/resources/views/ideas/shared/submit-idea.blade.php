@auth()
<h4> Share your ideas </h4>
<div class="row">
    <form action="{{route('ideas.store')}}" method="POST">
        @csrf
    <div class="mb-3">
        <textarea name= "content" class="form-control" id="content" rows="3"></textarea>
       @error('content')
           <span class="d-block fs-6 text-danger">{{$message}}</span>
       @enderror
    </div>
    <div class="">
        <button class="btn btn-dark"> Share </button>
    </div>
</form>
</div>
@endauth

@guest()
<h4>{{__('ideas.login_to_share')}} </h4>
@endguest