{% assign counter = 0 %}
{% assign sorted_pages = site.pages | sort: 'date' %}

{% for projs in sorted_pages reversed %}
    {% if projs.tags contains 'project' and projs.tags contains include.param %}
      {% if counter == 0 %}
        <div class="row">
      {% endif %}

      {% capture counter %}{{ counter | plus: '1' }}{% endcapture %}

      <div class="col-xs-12 col-sm-4 col-md-3 col-lg-3">
        <div class="thumbnail">
          <a href="{{ projs.slug }}"><img src="{{ projs.thumbnail }}" class="img-thumbnail img-responsive" alt="thumbnail"></a>
          <div class="caption">
            <a href="{{ projs.slug }}"><h4 class="text-center">{{ projs.title }}</h4></a>
            <p class="text-center">{{ projs.start }} &#187; {{ projs.end }}</p>
            <p><a href="{{ projs.slug }}" class="btn btn-primary btn-lg btn-block" role="button">Read</a></p>
          </div><!-- caption -->
        </div><!-- thumbnail -->
      </div><!-- column -->
    {% endif %}
{% endfor %}
{% if counter != 0 %}
    </div><!-- row -->
{% endif %}
