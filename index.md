---
layout: default
title: Offentlege Notat
---

<div class="home">
  <h1 class="page-heading">{{ site.title }}</h1>
  
  <p>{{ site.description }}</p>

  <h2>Latest Notes</h2>
  
  <ul class="notes-list">
    {% assign sorted_notes = site.notes | sort: 'date' | reverse %}
    {% for note in sorted_notes limit: 10 %}
      <li class="notes-list-item">
        <h3 class="notes-list-title">
          <a href="{{ note.url | relative_url }}">{{ note.title }}</a>
        </h3>
        <p class="notes-list-meta">
          {% if note.date %}
            <time datetime="{{ note.date | date_to_xmlschema }}">{{ note.date | date: "%B %d, %Y" }}</time>
          {% endif %}
          {% if note.tags %}
            {% for tag in note.tags %}
              <a href="{{ '/tag/' | append: tag | relative_url }}" class="tag">#{{ tag }}</a>
            {% endfor %}
          {% endif %}
        </p>
        {% if note.excerpt %}
          <p class="notes-list-excerpt">{{ note.excerpt | strip_html | truncatewords: 30 }}</p>
        {% endif %}
      </li>
    {% endfor %}
  </ul>

  <h2>Browse by Tags</h2>
  <div class="tag-cloud">
    {% assign tag_list = site.notes | map: 'tags' | join: ',' | split: ',' | uniq | sort %}
    {% for tag in tag_list %}
      {% if tag != '' %}
        <a href="{{ '/tag/' | append: tag | relative_url }}" class="tag">#{{ tag }}</a>
      {% endif %}
    {% endfor %}
  </div>

  <h2>All Notes</h2>
  <p><a href="{{ '/notes/' | relative_url }}">View all notes →</a></p>

</div>