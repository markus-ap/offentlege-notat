---
layout: default
title: Tags
permalink: /tags/
---

# Tags

<div class="tag-cloud">
  {% assign tag_counts = site.notes | map: 'tags' | join: ',' | split: ',' | sort %}
  {% assign tag_list = '' | split: ',' %}
  {% for tag in tag_counts %}
    {% if tag != '' %}
      {% assign tag_list = tag_list | push: tag %}
    {% endif %}
  {% endfor %}
  {% assign unique_tags = tag_list | uniq | sort %}
  
  {% for tag in unique_tags %}
    {% assign tag_count = 0 %}
    {% for t in tag_list %}
      {% if t == tag %}
        {% assign tag_count = tag_count | plus: 1 %}
      {% endif %}
    {% endfor %}
    <a href="{{ '/tag/' | append: tag | relative_url }}" class="tag" style="font-size: {{ tag_count | times: 0.2 | plus: 1 }}rem;">#{{ tag }} ({{ tag_count }})</a>
  {% endfor %}
</div>

<h2>All Tags</h2>

<ul>
  {% for tag in unique_tags %}
    {% assign tag_count = 0 %}
    {% for t in tag_list %}
      {% if t == tag %}
        {% assign tag_count = tag_count | plus: 1 %}
      {% endif %}
    {% endfor %}
    <li>
      <a href="{{ '/tag/' | append: tag | relative_url }}">#{{ tag }}</a> ({{ tag_count }} notes)
    </li>
  {% endfor %}
</ul>