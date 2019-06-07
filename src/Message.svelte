<script>
  export let text;
  export let displayName;
  export let photoURL;
</script>

<div class="card">
  <div class="card-content">
    <div class="media">
      <div class="media-left">
        <figure class="image is-64x64">
          <img src={photoURL} alt="person pic" />
        </figure>
      </div>
      <div class="media-content">
        <p class="title is-5">{text}</p>
        <p class="subtitle is-10">{displayName}</p>
      </div>
    </div>
  </div>
</div>
